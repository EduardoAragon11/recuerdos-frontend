import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/app/utils';
import { Box, Button, Checkbox, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface Photo {
    id: number;
    screenX: number;
    screenY: number;
    imageData: Uint8Array;
    choosen: boolean;
    size: number;
}

interface PhotoEdit { 
    id: number;
    screenX: number;
    screenY: number;
    choosen: boolean;
    size: number;
}

interface SimpleEvent {
  name:string,
  time:string, 
  size:number,
}

export default function PhotosEditComplete(props: any) {
  const id: number = props.id;
  const [photos, setPhotos] = useState<Array<Photo>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentChoosen, setCurrentChoosen] = useState<boolean>(false);
  const [event, setEvent] = useState<SimpleEvent | null>(null)

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'get',
      url: `${API_URL}/event/${id}/photos`,
    })
    .then((response) => {
      setPhotos(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
    });

    axios({
      method: 'get',
      url: API_URL + `/event/simple/${id}`,
    })
    .then(response => {
      setEvent(response.data)
    })
    .catch(error => {
      console.error(error);
    })
    
  }, []);

  useEffect(() => {
    if (photos.length > 0) setCurrentChoosen(photos[currentIndex].choosen);
  }, [currentIndex, photos]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const handleClose = () => {
    axios({
      method: 'delete',
      url: API_URL + `/photo/${photos[currentIndex].id}`
    })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleChoose = (event: any) => {
    setCurrentChoosen(event.target.checked);
    photos[currentIndex].choosen = !photos[currentIndex].choosen;
    photos[currentIndex].screenX = 0;
    photos[currentIndex].screenY = 0;
    photos[currentIndex].size = 256;
    console.log(photos);
    setPhotos([...photos]);
  }

  /////Move photos

  const [draggingPhotoId, setDraggingPhotoId] = useState<number | null>(null);
  const [initialMousePos, setInitialMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialPhotoPos, setInitialPhotoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent, id: number) => {
    setDraggingPhotoId(id);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
    const photo = photos.find(photo => photo.id === id);
    if (photo) {
      setInitialPhotoPos({ x: photo.screenX, y: photo.screenY });
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (draggingPhotoId !== null) {
      const deltaX = e.clientX - initialMousePos.x;
      const deltaY = e.clientY - initialMousePos.y;
      setPhotos(prevPhotos =>
        prevPhotos.map(photo =>
          photo.id === draggingPhotoId
            ? { ...photo, screenX: initialPhotoPos.x + deltaX, screenY: initialPhotoPos.y + deltaY }
            : photo
        )
      );
    }
  };

  const onMouseUp = () => {
    setDraggingPhotoId(null);
  };

  //Save button

  const onSave = () => {
    const editPhotos: PhotoEdit[] = photos.map(photo => ({
      id: photo.id,
      screenX: photo.screenX,
      screenY: photo.screenY,
      choosen: photo.choosen,
      size: photo.size,
    }));

    axios({
      method: 'patch',
      url: API_URL + "/photo/edit",
      data: editPhotos
    })
    .then(response => {
        window.location.reload();
    })
    .catch(error => {
      console.error(error);
    });

    if(event){
      axios({
        method: 'patch',
        url: API_URL + `/event/${id}`,
        data: event
      })
      .then(response => {
          window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
/*
  const onSaveEvent = () => {
    
    onSave();
  }
*/

  // change event
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isEditingTime, setIsEditingTime] = useState<boolean>(false);
  const handleChangeEvent = (a:string, e:any) => {
    console.log(event);
    if(event){
      setEvent({
        ...event,
        [a]: e,
      })
    }
  }

  const handleChangeTime = (t:Dayjs | null) => {
    if(event && t){
      setEvent({
        ...event,
        time: t.format("HH:mm:ss"),
      })
    }
  }
  

  return (
    <Box onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
        <Button variant='contained' onClick={onSave}>Save</Button>
      {loading ? <h1>Loading</h1> : (
        <Box className="flex flex-col items-center justify-center h-full bg-gray-100">
          {
            photos.length === 0? <h1>Aun no hay fotos :c</h1>:
            <Box className="relative w-full flex justify-center items-center">
              <Box className="h-64 relative">
                <img
                  src={'data:image/jpg;base64,' + photos[currentIndex].imageData}
                  alt="carousel"
                  className="w-full h-full"
                />
                <IconButton
                  className='absolute top-0 right-0'
                  onClick={handleClose}
                >
                  <Close />
                </IconButton>
                <Checkbox
                  className='absolute top-0 left-0'
                  checked={currentChoosen}
                  onClick={handleChoose}
                />
              </Box>
              <IconButton
                className="absolute left-4"
                onClick={handlePrev}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                className="absolute right-4"
                onClick={handleNext}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Box>
          }
          <Box className="flex mt-4 space-x-2">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={'data:image/jpg;base64,' + photo.imageData}
                alt={`thumbnail-${index}`}
                className={`h-16 object-cover cursor-pointer ${index === currentIndex ? 'border-2 border-blue-500' : 'border'}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Box>
        </Box>
      )}
      {(loading && !event)? <h1>Loading</h1> : (
      <>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <div onDoubleClick={() => {setIsEditingName(true)}}>
            {
              isEditingName? (
                <TextField
                  value={event?.name}
                  onChange={(e) => {handleChangeEvent("name", e.target.value)}}
                  onBlur={() => {setIsEditingName(false)}}
                />
              )
              :
              <span>{event?.name}</span>
            }
          </div>
          <div onDoubleClick={() => {setIsEditingTime(true)}}>
            {
              isEditingTime? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="Hora"
                        onChange={(value) => handleChangeTime(value)}
                        slotProps={{
                          textField:{
                            onBlur: () => {setIsEditingTime(false)}
                          }
                        }}
                    />
                </LocalizationProvider>
              )
              :
              <span>{event?.time}</span>
            }
          </div>
          <FormControl>
            <InputLabel>Tamaño de fondo</InputLabel>
            <Select
              label="Tamaño de fondo"
              value={event?.size}
              onChange={(e) => {handleChangeEvent("size", e.target.value)}}
          >
            <MenuItem value={50}>Poco Espacio</MenuItem>
            <MenuItem value={300}>Pequeño</MenuItem>
            <MenuItem value={500}>Mediano</MenuItem>
            <MenuItem value={800}>Grande</MenuItem>
            <MenuItem value={1300}>Inmenso</MenuItem>  
          </Select>
          </FormControl>
        </Stack>
          <Box 
          className="relative flex flex-col bg-red-400"
          style={{
            height: `${event?.size}px`
          }}
        >
          {photos.filter(photo => photo.choosen).map(photo => (
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
                  style={{
                    height: `${photo.size}px`
                  }}
                  className="object-cover"
                />
              </Paper>
            </Box>
          ))}
        </Box>
      </>
      )}
      
    </Box>
  );
}
