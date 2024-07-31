import { API_URL } from "@/app/utils"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Photo(props:any){
    const [imageSrc, setImageSrc] = useState<string>('');
    useEffect(() => {
        setImageSrc('data:image/jpg;base64,' + props.imageData);
    },[])
    return(
        <img src = {imageSrc}/>
    )
}