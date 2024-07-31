'use client'

import React from 'react'
import { useEffect, useState } from "react"
import PhotosEdit from '../../component_photos/PhotosEdit';

export default function Edit({params} : {params: {id:number}}){
    const [id, setId] = useState<number | null>(null);
    useEffect(() => {
        setId(params.id);
    },[])
    return(
        <div>
            {
                (!id) ?<h1>Loading</h1>
                :
                <PhotosEdit id = {id}/>
            }
        </div>
    )
}