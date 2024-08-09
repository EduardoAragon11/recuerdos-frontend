import React, { useEffect, useState } from "react";
import PhotoCarrusel from "./PhotoCarrusel";
import PhotosUpload from "./PhotosUpload";
import { Box } from "@mui/material";
import PhotoScreen from "./PhotoScreen";
import PhotosEditComplete from "./PhotosEditComplete";

export default function PhotosEdit(props:any){
    const [id, setId] = useState<number | null>(null)
    useEffect(() => {
        setId(props.id);
    },[])
    return(
        <Box>
            <h1 className="bg-red-500">Editar</h1>

            {
                (!id)?<h1>Loading</h1>
                :
                <Box>
                    <PhotosUpload id={id}/>
                    <PhotosEditComplete id={id}/>
                </Box>
            }
        </Box>
    )
}