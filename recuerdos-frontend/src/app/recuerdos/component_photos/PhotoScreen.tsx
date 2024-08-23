import { Box, Paper } from "@mui/material";
import PhotoCarrusel from "./PhotoCarrusel";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/app/utils";

interface Photo {
    id: number;
    screenX: number;
    screenY: number;
    size: number;
    imageData: Uint8Array;
}

export default function PhotoScreen(props:any){
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        axios({
            method: 'get',
            url: API_URL + `/event/${props.id}/choosen_photos`
        })
        .then(response => {
            setPhotos(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
        })
    },[])
    return(
        <Box>
            {
                loading ? <h1>Loading</h1> : (
                    <Box className="relative flex flex-col h-full bg-gray-100">
                        {photos.map((photo) => (
                            <Box
                                key={photo.id}
                                className="absolute"
                                style={{
                                    top: `${photo.screenY}px`,
                                    left: `${photo.screenX}px`,
                                }}
                            >
                                <Paper elevation={3}>
                                    <img
                                        src={`data:image/jpg;base64,${photo.imageData}`}
                                        alt={`photo-${photo.id}`}
                                        style={{
                                            height:`${photo.size}px`
                                        }}
                                        className="object-cover"
                                    />
                                </Paper>
                            </Box>
                        ))}
                    </Box>
                )
            }
        </Box>
    )
}


/*
<Box>
{loading ? <h1>Loading</h1> : (
    <Box className="flex flex-col items-center justify-center h-full bg-gray-100">
    Hola
    </Box>
)}
</Box>*/