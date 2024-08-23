import { API_URL } from "@/app/utils";
import { Button } from "@mui/material"
import axios from "axios";
import { Dayjs } from 'dayjs'

export default function NewDateButton(props:any){
    const selectedDate:Dayjs = props.selectedDate;
    const handleClick = () => {
        axios({
            method:'post',
            url: API_URL + "/dia",
            data:{
                date: selectedDate.format('YYYY-MM-DD').toString() 
            }
        })
        .then(() => {
            location.reload();
        })
        .catch(error => {
            console.error(error);
        })
    }
    return(
        <Button variant="contained" onClick={handleClick}>Crear Dia</Button>
    )
}