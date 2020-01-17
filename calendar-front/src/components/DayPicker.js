import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'

const DayPicker = () => {

  const [day, setDay] = useState('')
  console.log('you picked:', day)

  return (
    <div>
      Please give date:
      {/*<DayPickerInput onDayChange={day => console.log(day.getDate(), day.getMonth() + 1, day.getFullYear())} /> */}
      <DayPickerInput onDayChange={day => setDay(day)} 
      />
      {/*<div>pickedDate:{day}</div> */}
    </div>
  );
}

export default DayPicker