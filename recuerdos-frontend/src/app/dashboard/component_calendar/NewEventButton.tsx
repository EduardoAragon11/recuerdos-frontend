import { API_URL } from "@/app/utils";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface NewEvent {
    name: string,
    time: string,
}

export default function NewEventButton(props:any) {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [time, setTime] = useState<Dayjs | null>(dayjs('2024-04-07T00:00'));
    const [error, setError] = useState<string | null >(null);
    const handleClose = () => {
        setOpen(false);
    };

    const handleSend = () => {
        if(!name){
            setError("Escribe un título");
            return;
        }
        else{
            setError(null);
        }
        const newEvent:NewEvent = {
            name,
            time: time? time.format("HH:mm:ss"):"00:00:00"
        }
        axios({
            method: 'put',
            url: API_URL + `/dia/${props.id}/event`,
            data: newEvent,
        })
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            console.error(error);
        })
    }


    return(
        <>
            <Button 
                variant="contained"
                onClick={() => {setOpen(true)}}>
                New Event
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Crea un Evento</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name="title"
                        label="Título"
                        onChange={(e) => {setName(e.target.value)}}
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Hora"
                            onChange={(newValue) => setTime(newValue)}
                        />
                    </LocalizationProvider>
                    {
                        error?
                        <h1>{error}</h1>
                        :
                        null
                    }
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSend}>Crear</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}