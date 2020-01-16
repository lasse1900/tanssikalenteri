//http://react-day-picker.js.org/examples/input
import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'

const DayPicker = () => {

  // const [day, setDay] = useState('')

  return (
    <div>
      Please give date:
      <DayPickerInput onDayChange={day =>
        day.getFullYear()} 
        
        />

    </div>
  );
}

export default DayPicker


// console.log(day.getDate(), day.getMonth() + 1, day.getFullYear())

// selectedDate={day => day.getDate(), day.getMonth(), day.getFullYear()} />