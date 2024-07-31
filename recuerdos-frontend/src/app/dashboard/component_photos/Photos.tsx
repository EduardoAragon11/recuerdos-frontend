import { API_URL } from "@/app/utils"
import { useEffect, useState } from "react"
import axios from "axios";
import Photo from "./Photo";

interface Photo{
    id:number,
    screenX:number | null,
    screenY:number | null,
    imageData: Uint8Array;
}

export default function Photos(props:any){
    const id:number = props.id;
    const [photos,setPhotos] = useState<Array<Photo>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        axios({
            method:'get',
            url: API_URL + `/event/${id}/photos`
        })
        .then(response => {
            setLoading(false);
            setPhotos(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    },[])
    return(
        <div>
            {
                loading ? 
                <h1>Cargando</h1>
                :
                photos.map(photo => {
                    return <Photo imageData={photo.imageData}/>
                })    
            }
        </div>
    )
}