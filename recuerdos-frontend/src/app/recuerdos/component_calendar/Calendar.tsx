
import { DateCalendar, DayCalendarSkeleton, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react'
import { Badge } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import axios, {AxiosResponse} from 'axios';
import { API_URL } from '@/app/utils';
import NewDateButton from './NewDateButton';
import DeleteDateButton from './DeleteDateButton';
import Dia from '../component_dia/Dia';
import NewEventButton from './NewEventButton';


function ServerDay(props: any) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
  
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '❤️' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }

  
interface SpecialDay {
  id: number,
  numero_dia: number
}

export default function Calendar(){
    const [loading, setLoading] = useState<boolean>(false)
    const [highlightedDays, setHighlightedDays] = useState<number[]>([])
    const [objectDays, setObjectDays] = useState<SpecialDay[]>([])
    const [month, setMonth] = useState<number>(dayjs().month());
    const [year, setYear] = useState<number>(dayjs().year());
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [idSelectedDate, setIdSelectedDate] = useState<number | null>(null);
    
    useEffect(() => {
      setLoading(true);
      axios({
        method: 'get',
        url: API_URL + '/dia/year-month',
        params: {
          month,
          year
        }
      })
      .then(response => {
        setObjectDays(response.data);
        let answerDays:number[] = [];
        response.data.forEach((day:SpecialDay) => answerDays.push(day.numero_dia))
        setHighlightedDays(answerDays);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      })
    
    }, [year,month]);

    useEffect(() => {
      if (typeof window !== 'undefined') {
          const currentDia = localStorage.getItem("currentDia");
          const initialValue = currentDia ? dayjs(currentDia) : dayjs("2024-04-07");
          setMonth(dayjs(currentDia).month());
          setYear(dayjs(currentDia).year());
          setSelectedDate(initialValue);
      }
  }, []);

    const handleChange = ((value: Dayjs) => {
      setSelectedDate(value);
      setIdSelectedDate(null);
      objectDays.forEach((day:SpecialDay) => {
        if(day.numero_dia == value.date()){
          setIdSelectedDate(day.id);
        }
      })
      localStorage.setItem("currentDia", value.format('YYYY-MM-DD'));
    })

    return(
      <div className='flex items-center justify-center flex-col mt-5'>
        <div className='w-1/2'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                  value = {selectedDate}
                  onChange = {handleChange}
                  loading={loading}
                  renderLoading={() => <DayCalendarSkeleton/>}
                  slots={{
                      day: (dayProps) => <ServerDay {...dayProps} highlightedDays={highlightedDays} />,
                  }}
                  onYearChange={(value:Dayjs) => {setYear(value.year())}}
                  onMonthChange={(value:Dayjs) => {setMonth(value.month()+1)}}
                  className='bg-pink-lighter rounded-2xl'
              />
          </LocalizationProvider>
        </div>
        {
          idSelectedDate ?
            <div className='w-full items-center justify-center flex flex-col'>
              <div className='w-full justify-center space-x-3 flex flex-row mt-4'>
                <DeleteDateButton id = {idSelectedDate}/>
                <NewEventButton id = {idSelectedDate}/>
              </div>
              <Dia id = {idSelectedDate}/>
            </div>
          :
            <div className='w-full justify-center space-x-3 flex flex-row mt-4'>
              <NewDateButton selectedDate={selectedDate}/>
            </div>
        }
        
      </div>
    )
}
//
            
//Quizas hacer que al crear o borrar dia, solo se actualize el cuadro (puede ser cosotoso)