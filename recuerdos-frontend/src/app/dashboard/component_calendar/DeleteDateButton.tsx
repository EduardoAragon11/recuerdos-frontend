import { API_URL } from "@/app/utils";
import { Button } from "@mui/material"
import axios from "axios";

export default function DeleteDateButton(props:any){
    const id:number = props.id;
    const handleClick = () => {
        axios({
            method:'delete',
            url: API_URL + `/dia/${id}`,
        })
        .then(() => {
            location.reload();
        })
        .catch(error => {
            console.error(error);
        })
    }
    return(
        <Button variant="contained" disabled onClick={handleClick}>Borrar Dia</Button>
    )
}