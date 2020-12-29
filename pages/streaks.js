import { useState, useEffect } from 'react';
import { makeStyles, createStyles, useTheme, Badge } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, Calendar, Day} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {fetchStreaks} from '../store/model/streakModel'
import AlbumIcon from '@material-ui/icons/Album';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const Streak = () => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    useEffect(async() => {
        const {data} = await fetchStreaks()
        setSelectedDays(data.completedDates)
    }, [])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const dateConverter = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    const displayElement = (payload) => {
        return (
            <div>
                <span className='rootStyle'>
                    {payload}
                </span>
            </div>
        )
    }
    
    const checkSum = (isIncluded, day) => {
        let type 
        if (isIncluded){
            type = <CheckCircleOutlineIcon className='iconStyle'/>
        }
        else if(dateConverter(day) == dateConverter(new Date())){
            type = <AlbumIcon className='iconStyle'/>
        }
        else if(dateConverter(day) > dateConverter(new Date())){
            type = <Brightness1Icon className='futureStyle'/>
        }
        else{
            type = <CloseIcon className='iconStyle'/>
        }
        return type
    }

    return (
       <MuiPickersUtilsProvider utils={DateFnsUtils} >
           <Style/>
           <Calendar
            date={selectedDate}
            onChange={handleDateChange}
            renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                const isIncluded =   selectedDays.includes(dateConverter(day)) 
                 const type = checkSum(isIncluded, day)
                return <Badge>{displayElement(type)}</Badge>;
              }}
            disableFuture
            disablePast
          />
       </MuiPickersUtilsProvider>
  )
}

const Style = () => {
    return (
      <style jsx global>{`
        .rootStyle{
            display: inline-flex;
            position: relative;
            flex-shrink: 0;
            vertical-align: middle;

        }
        .iconStyle{
            width: 30px;
            height: 30px;
            margin: 0 5px;
            padding: 0;
            font-size: 0.75rem;
            font-weight: 500;
        }
        .futureStyle{
            width: 30px;
            height: 30px;
            margin: 0 5px;
            padding: 0;
            font-size: 0.75rem;
            font-weight: 500;
            color: #b39084 !important
        }
      `}</style>
    )
  }
  

export default Streak;
