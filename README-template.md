# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Links

- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [DayJS](https://day.js.org/en/) - Date library

### What I learned

```jsx
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
```
* - Learnt how to use dayJS to compare ages, using .diff() to get the difference and using that difference to build up to the current date from the input birth date.


### Continued development

Continue learning to use different lightweight plugins for cases like this

### Useful resources

- [DayJS Docs](https://day.js.org/en/) - Used this library + its methods for certain validation methods in my script.

## Author

- Frontend Mentor - [@lemz100](https://www.frontendmentor.io/profile/lemz100)
