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
        <div className="bg-pink-lighter flex flex-col my-5">
            <div className="w-full self-center text-xl p-3">Edita las fotos!</div>
            {
                (!id)?<h1>Loading</h1>
                :
                <Box>
                    <PhotosUpload id={id}/>
                    <PhotosEditComplete id={id}/>
                </Box>
            }
        </div>
    )
}