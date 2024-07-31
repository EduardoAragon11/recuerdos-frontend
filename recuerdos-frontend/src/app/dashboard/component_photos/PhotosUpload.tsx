import { API_URL } from "@/app/utils";
import { CloudUploadOutlined } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function PhotosUpload(props:any){
    const [files, setFiles] = useState<FileList | null>(null);

    const handleFilesChange = (event:any) => {
        setFiles(event.target.files);
    };
    const handleFilesUpload = (event:any) => {
        if(!files){
            console.error("No files selected");
            return;
        }
        
        const formData:FormData = new FormData();
        for(let i=0; i<files.length;i++){
            formData.append('images',files[i]);
        }
        axios({
            method: 'post',
            url: API_URL + `/event/${props.id}/photos`,
            data:formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .catch(error => {
            console.error(error);
        })
    }
    return(
        <Box>
            <TextField type = "file" inputProps={{multiple:true, accept: "image/*"}} onChange={handleFilesChange}/>
            <Button variant="contained" startIcon={<CloudUploadOutlined/>} onClick={handleFilesUpload}>Upload Images</Button>
        </Box>
    )
}