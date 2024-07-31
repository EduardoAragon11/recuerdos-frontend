'use client'

import React from 'react'
import Calendar from '@/app/dashboard/component_calendar/Calendar'

export default function Dashboard(){
    return (
        <div>
            <div className=''>
                Dashboard
            </div>
            <div>
                <Calendar/>
            </div>
            
        </div>
    )
}