import { Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, IconButton, ListItemButton, Paper, Stack } from "@mui/material";
import { useState } from "react";
import PhotoScreen from "../component_photos/PhotoScreen";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";

interface SimpleEvent {
    id:number,
    name:string,
    time:number[], 
    size:number,
}

export default function Event(props:any){
    const event:SimpleEvent = props.event;
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleEdit = () => {
        router.push(`recuerdos/event_edit/${event.id}`);
    }

    return(
        <Paper key={event.id}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" className="p-3">
                <span className="">{event.name}</span>
                <span>{dayjs().hour(event.time[0]).minute(event.time[1]).format("HH:mm")}</span>
                <IconButton>
                    <Edit onClick={handleEdit}/>
                </IconButton>
            </Stack>
            <ListItemButton onClick={handleClick}>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open}>
                {
                    open?
                    <div style={{ position: 'relative', height: `${event.size}px`, overflow: 'hidden' }}>
                        <PhotoScreen id = {event.id}/>
                    </div>
                    
                    :
                    null
                }
            </Collapse>
        </Paper>
    )
}
