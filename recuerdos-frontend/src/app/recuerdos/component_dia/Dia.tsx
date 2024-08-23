import { API_URL } from "@/app/utils"
import axios from "axios"
import { useEffect, useState } from "react"
import Event from "../component_event/Event"
import { Stack } from "@mui/material"

interface SimpleEvent {
    id: number,
    name:string,
    time:string,
    size: number,
}

interface Day {
    id: number,
    date: string,
    events: SimpleEvent[]
}

export default function Dia(props:any){
    const [dia, setDia] = useState<Day | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const id:number = props.id;
    useEffect(() => {
        axios({
            method: 'get',
            url: API_URL + `/dia/${id}`
        })
        .then(response => {
            setDia(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
        })
    },[id])

    return(
        loading || dia == null ?
        <h1>Loading</h1>
        :
        <Stack spacing={3} my={2} className="w-full">
            {
                dia.events.length ?
                dia.events.map(event => {
                    return <Event key ={event.id} event = {event}/>
                })
                :
                <h1>Aun no se crearon eventos :c</h1>
            }
        </Stack>
        
    )
}