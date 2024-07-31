import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/app/utils';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';

interface Photo {
  id: number;
  imageData: Uint8Array;
}

export default function PhotoCarrusel(props: any) {
  const id: number = props.id;
  const [photos, setPhotos] = useState<Array<Photo>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <>
      {loading ? <h1>Loading</h1> : (
        <Box className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <Box className="relative w-full flex justify-center items-center">
            <IconButton
              className="absolute left-4"
              onClick={handlePrev}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
            >
              <ArrowBackIos />
            </IconButton>
            <Box className="h-64 relative">
                <img
                    src={'data:image/jpg;base64,' + photos[currentIndex].imageData}
                    alt="carousel"
                    className="w-full h-full object-cover"
                />
                <IconButton className='absolute right-0 top-0 transform -translate-y-1/2'>
                    <Close/>
                </IconButton>
            </Box>
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
                key={index}
                src={'data:image/jpg;base64,' + photo.imageData}
                alt={`thumbnail-${index}`}
                className={`h-16 object-cover cursor-pointer ${
                  index === currentIndex ? 'border-2 border-blue-500' : 'border'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
