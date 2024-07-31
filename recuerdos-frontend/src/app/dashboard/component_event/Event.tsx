import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, ListItemButton, Paper, Stack } from "@mui/material";
import { useState } from "react";
import Photos from "../component_photos/Photos";
import Photo from "../component_photos/Photo";
import PhotoCarrusel from "../component_photos/PhotoCarrusel";
import PhotosEdit from "../component_photos/PhotosEdit";
import PhotoScreen from "../component_photos/PhotoScreen";

interface SimpleEvent {
    id:number,
    name:string,
    time:string
}

export default function Event(props:any){
    const event:SimpleEvent = props.event;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return(
        <Paper key={event.id}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <span>{event.name}</span>
                <span>{event.time}</span>
            </Stack>
            <ListItemButton onClick={handleClick}>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open}>
                {
                    open?
                    <PhotoScreen id = {event.id}/>
                    :
                    null
                }
            </Collapse>
        </Paper>
    )
}
