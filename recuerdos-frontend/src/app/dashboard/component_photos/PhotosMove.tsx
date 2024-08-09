import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";

interface Photo {
    id: number;
    screenX: number;
    screenY: number;
    imageData: Uint8Array;
}

export default function PhotosMove(props: any) {
    const [choosenPhotos, setChoosenPhotos] = useState<Photo[]>(props.choosenPhotos);

    useEffect(() => {
        setChoosenPhotos(props.choosenPhotos);
        console.log("as");
    }, [props.choosenPhotos]);

    const [draggingPhotoId, setDraggingPhotoId] = useState<number | null>(null);
    const [initialMousePos, setInitialMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [initialPhotoPos, setInitialPhotoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent, id: number) => {
        setDraggingPhotoId(id);
        setInitialMousePos({ x: e.clientX, y: e.clientY });
        const photo = choosenPhotos.find(photo => photo.id === id);
        if (photo) {
            setInitialPhotoPos({ x: photo.screenX, y: photo.screenY });
        }
        console.log(choosenPhotos);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (draggingPhotoId !== null) {
            const deltaX = e.clientX - initialMousePos.x;
            const deltaY = e.clientY - initialMousePos.y;
            setChoosenPhotos(prevPhotos =>
                prevPhotos.map(photo =>
                    photo.id === draggingPhotoId
                        ? { ...photo, screenX: initialPhotoPos.x + deltaX, screenY: initialPhotoPos.y + deltaY }
                        : photo
                )
            );
        }
    };

    const onMouseUp = () => {
        const photo = choosenPhotos.find(photo => photo.id === draggingPhotoId);
        if(photo) console.log(photo);
        setDraggingPhotoId(null);
    };

    return (
        <Box onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            <Box className="relative flex flex-col h-full bg-gray-100">
                {choosenPhotos.map(photo => (
                    <Box
                        key={photo.id}
                        className="absolute cursor-move"
                        style={{
                            top: `${photo.screenY}px`,
                            left: `${photo.screenX}px`,
                        }}
                        onMouseDown={(e) => onMouseDown(e, photo.id)}
                    >
                        <Paper elevation={3}>
                            <img
                                src={`data:image/jpg;base64,${photo.imageData}`}
                                alt={`photo-${photo.id}`}
                                className="h-64 object-cover"
                            />
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
