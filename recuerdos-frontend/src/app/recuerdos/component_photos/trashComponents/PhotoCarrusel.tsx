import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/app/utils';
import { Box, Checkbox, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Close, FlashAuto } from '@mui/icons-material';
import PhotosMove from './PhotosMove';
import Image from 'next/image';

interface Photo {
  id: number;
  screenX: number,
  screenY: number,
  url: string,
  choosen: boolean;
}

export default function PhotoCarrusel(props: any) {
  const id: number = props.id;
  const [photos, setPhotos] = useState<Array<Photo>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingPhotos, setLoadingPhotos] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentChoosen, setCurrentChoosen] = useState<boolean>(false);
  const [choosenPhotos, setChoosenPhotos] = useState<Array<Photo>>([]);

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
      url: API_URL + `/event/${props.id}/choosen_photos`
    })
    .then(response => {
      setChoosenPhotos(response.data);
      setLoadingPhotos(false);
    })
    .catch(error => {
      console.error(error);
    })
  }, []);

  useEffect(() => {
    if(photos.length > 0) setCurrentChoosen(photos[currentIndex].choosen)
  },[currentIndex])

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
    })
  }

  const handleChoose = (event:any) => {
    setCurrentChoosen(event.target.checked)
    photos[currentIndex].choosen = !photos[currentIndex].choosen;
    
    const newChoosenPhotos:Photo[] = choosenPhotos;
    
    if(photos[currentIndex].choosen){
      photos[currentIndex].screenX = 0;
      photos[currentIndex].screenY = 0;
      newChoosenPhotos.push(photos[currentIndex])
    }
    else{
      const index:number = newChoosenPhotos.indexOf(photos[currentIndex])
      if(index) newChoosenPhotos.splice(index,1);
    }
    console.log(newChoosenPhotos);
    setChoosenPhotos(newChoosenPhotos);
  }
  return (
    <Box>
      {loading ? <h1>Loading</h1> : (
        <Box className="flex flex-col items-center justify-center h-full bg-gray-100">
          <Box className="relative w-full flex justify-center items-center">
            <Box className="h-64 relative">
                <img
                  src={photos[currentIndex].url}
                  alt={`photo-${photos[currentIndex].id}`}
                />
                <IconButton 
                  className='absolute top-0 right-0'
                  onClick={handleClose}
                >
                    <Close/>
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
          <Box className="flex mt-4 space-x-2">
            {photos.map((photo, index) => (
              <img
                src={photo.url}
                alt={`photo-${photo.id}`}
                className={`h-16 object-cover cursor-pointer ${
                  index === currentIndex ? 'border-2 border-blue-500' : 'border'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Box>
        </Box>
      )}
      {loadingPhotos ? <h1>Loading</h1>:(
        <PhotosMove choosenPhotos={choosenPhotos}/>
      )}
    </Box>
  );
}
