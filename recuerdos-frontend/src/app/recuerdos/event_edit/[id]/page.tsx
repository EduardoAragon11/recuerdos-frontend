'use client'

import React from 'react'
import { useEffect, useState } from "react"
import PhotosEdit from '../../component_photos/PhotosEdit';
import PhotoCarrusel from '../../component_photos/PhotoCarrusel';
import { Paper } from '@mui/material';

export default function Edit({params} : {params: {id:number}}){
    const [id, setId] = useState<number | null>(null);
    useEffect(() => {
        setId(params.id);
    },[])
    return(
        <Paper>
            {
                (!id) ?<h1>Loading</h1>
                :
                <PhotosEdit id = {id}/>
            }
        </Paper>
    )
}

//Problemas con paper, tailwind y relative, absolute
//Cambiar paper x div y pasan cosas