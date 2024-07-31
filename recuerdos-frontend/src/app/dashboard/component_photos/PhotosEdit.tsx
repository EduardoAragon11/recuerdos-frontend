import { useEffect, useState } from "react";
import PhotoCarrusel from "./PhotoCarrusel";
import PhotosUpload from "./PhotosUpload";
import { Box } from "@mui/material";

export default function PhotosEdit(props:any){
    const [id, setId] = useState<number | null>(null)
    useEffect(() => {
        setId(props.id);
    },[])
    return(
        <div>
            Editar
            {
                (!id)?<h1>Loading</h1>
                :
                <Box>
                    <PhotosUpload id={id}/>
                    <PhotoCarrusel id={id}/>
                    
                </Box>
            }
        </div>
    )
}