import './App.less';
import Counter from './assets/components/Counter/Counter'
import Button from './assets/components/Button/Button'
import Input from './assets/components/Input/Input'
import dayjs from 'dayjs'; // For checking if a date is valid.
import customParseFormat from "dayjs/plugin/customParseFormat"; // Needed for parsing format

import { useState } from 'react';

function App() {
  dayjs.extend(customParseFormat); // For using dayjs plugin
  
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    year: ''
  });
  const [formErrors, setFormErrors] = useState({
    day: '',
    month: '',
    year: ''
  })
  const [age, setAge] = useState({
    years: '--',
    months: '--',
    days: '--'
  })

  function handleChange(e) {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, ''); // removes all non-digits
    setFormData(prev => ({ ...prev, [name]: numericValue }));
  }

  function validateForm() {
    const newErrors = {};
    const emptyErrorMsg = 'This field is required';
    
    // Current date variables
    const now = new Date();
    const nowYear = now.getFullYear();

    // Input date variables
    const inputDay = formData.day;
    const inputMonth = formData.month;
    const inputYear = formData.year;
    const dateString = `${inputYear}-${inputMonth}-${inputDay}`; // Compiles inputs into a string
    const date = dayjs(dateString, 'YYYY-MM-DD', true); // Parses date string into a dayjs object for validating it.
  
    const isFuture = dayjs(dateString).isAfter(dayjs());
    const isValid = date.isValid();
    
    /** Checks if inputs are empty or invalid numbers */
    if(formData.year !== '') {
      if(formData.year < 1900 || formData.year > nowYear) {
        newErrors.year = 'Must be a valid year'
      }
    } else {
      newErrors.year = emptyErrorMsg;
    }
    if(formData.day !== '' ) {
      if(formData.day <= 1 || formData.day > 31) {
        newErrors.day = 'Must be a valid day';
      }
    } else { 
        newErrors.day = emptyErrorMsg;
    }
    if(formData.month !== '') {
        if(formData.month < 1 || formData.month > 12) {
          newErrors.month = 'Must be a valid month'
        }
    } else {
      newErrors.month = emptyErrorMsg;
    }

    /** Checks if the whole inputted date is in future or invalid */
    if (formData.day !== '' && formData.month !== '' && formData.year !== '') {
        if(!isValid || isFuture) {
          newErrors.day = 'Must be a valid date';
          newErrors.month = true;
          newErrors.year = true;
        }
      }
    setFormErrors(newErrors);

    // Returns true if newErrors is empty (no errors - can be submitted.)
    return Object.keys(newErrors).length === 0;
  }

  function calculateAge() {
    // Input date into a dayjs object
      const inputDay = formData.day;
      const inputMonth = formData.month;
      const inputYear = formData.year;
      const dateString = `${inputYear}-${inputMonth}-${inputDay}`; // Compiles inputs into a string
      const today = dayjs(); // Current day into dayjs object for comparing
      const date = dayjs(dateString, 'YYYY-MM-DD', true); // Input date into dayjs object for comparing
      
      const years = today.diff(date, 'year'); // Gets the difference between the input date and today's date in years (e.g. - 03/01/2001 > 2025 = 24 years)
      const afterYears = date.add(years, 'year'); // Adds the years onto the input date (e.g. 03/01/2025)

      const months = today.diff(afterYears, 'month'); // Gets the months since the modified input date (e.g. 03/01/2002 > 15/10/2025 = 9 months)
      const afterMonths = afterYears.add(months, 'month'); // Adds the months onto the modified input date (e.g. 03/10/2025)

      const days = today.diff(afterMonths, 'day'); // Gets the days since the modified input date (e.g. 03/10/2025 > 15/10/2025 = 12 days)
      
      return { years, months, days };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validateForm(); 
    if(isValid) {
      const { years, months, days } = calculateAge();
      setAge({
        years: years,
        months: months,
        days: days
      });
      /** Form + error resets */
      setFormData({
        day: '',
        month: '',
        year: ''
      });
      setFormErrors({
        day: '',
        month: '',
        year: ''
      });
    }
  }

  return (
    <>
    <main>
      <form
        noValidate
        action={'#'}
        onSubmit={handleSubmit}
        id={'calc-form'}
      >
        <Input
          name={'day'}
          id={'day'}
          bounds={2}
          label={'Day'}
          value={formData.day}
          onChange={e => handleChange(e)}
          errorText={formErrors.day}
          placeholder={'dd'}
        />
        <Input
          name={'month'}
          id={'month'}
          bounds={2}
          label={'Month'}
          value={formData.month}
          onChange={e => handleChange(e)}
          errorText={formErrors.month}
          placeholder={'mm'}
        />
        <Input
          name={'year'}
          id={'year'}
          bounds={4}
          label={'Year'}
          value={formData.year}
          onChange={e => handleChange(e)}
          errorText={formErrors.year}
          placeholder={'yyyy'}
        />
      </form>
      <div className="divider">
        <div className="line"></div>
        <Button onSubmit={handleSubmit} form={'calc-form'} />
        <div className="line"></div>
      </div>
      <Counter day={age.days} month={age.months} year={age.years}/>
    </main>
    </>
  );
}

export default App
