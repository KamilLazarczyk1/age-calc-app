import { useState } from 'react'
import './App.sass'
import IconArrow from './assets/icon-arrow.svg'
import { DateTime } from 'luxon'

function App() {

  const currentDate = DateTime.now();
  const [inputs, setInputs] = useState({ day: '', month: '', year: '' });
  const [finalYears, setFinalYears] = useState('--');
  const [finalMonths, setFinalMonths] = useState('--');
  const [finalDays, setFinalDays] = useState('--');

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let year = inputs.year, month = inputs.month, day = inputs.day;
    //console.log(inputs)
    if (!isNaN(day) && day.length === 1) {
      day = '0' + day
    }
    if (!isNaN(month) && month.length === 1) {
      month = '0' + month
    }

    let inputDate = DateTime.fromISO(year + '-' + month + '-' + day);
    let checkForError = false;

    const inputFields = [
      { name: "day", label: "dayLabel", error: "inputErrorDay" },
      { name: "month", label: "monthLabel", error: "inputErrorMonth" },
      { name: "year", label: "yearLabel", error: "inputErrorYear" }
    ];

    const changeInputColorToRed = () => {
      for (const field of inputFields) {
        document.querySelector(`label#${field.label}`).style.color = "hsl(0, 100%, 67%)";
        document.querySelector(`input#${field.name}`).style.borderColor = "hsl(0, 100%, 67%)";
      }
    }

    for (const field of inputFields) {
      document.querySelector(`label#${field.label}`).style.color = "hsl(0, 1%, 44%)";
      document.querySelector(`input#${field.name}`).style.borderColor = "hsl(0, 0%, 86%)";
      document.querySelector(`p#${field.error}`).innerText = "";
      document.querySelector(`p#${field.error}`).style.display = "none";
    }
    for (const field of inputFields) {
      if (inputs[field.name] === "") {
        document.querySelector(`p#${field.error}`).innerText = "This field is required";
        document.querySelector(`p#${field.error}`).style.display = "block";
      }
    }
    if (inputs.day === "" || inputs.month === "" || inputs.year === "") {
      changeInputColorToRed();
      checkForError = true;
    }
    if (inputDate.invalid !== null) {
      changeInputColorToRed();
      checkForError = true;
      let validCheck = false;
      if (inputs.day > 31 || inputs.day < 1 && inputs.day != '') {
        document.querySelector(`p#inputErrorDay`).innerText = "Must be a valid day";
        document.querySelector(`p#inputErrorDay`).style.display = "block";
        validCheck = true;
      }
      if (inputs.month > 12 || inputs.month < 1 && inputs.month != '') {
        document.querySelector(`p#inputErrorMonth`).innerText = "Must be a valid month";
        document.querySelector(`p#inputErrorMonth`).style.display = "block";
        validCheck = true;
      }
      if (inputs.year > currentDate.year) {
        document.querySelector(`p#inputErrorYear`).innerText = "Must be in the past";
        document.querySelector(`p#inputErrorYear`).style.display = "block";
        validCheck = true;
      }
      if (validCheck = true && inputs.day !== "" && inputs.month !== "" && inputs.year !== "") {
        document.querySelector(`p#inputErrorDay`).innerText = "Must be a valid date";
        document.querySelector(`p#inputErrorDay`).style.display = "block";
      }
    }
    if (checkForError == true) {
      return;
    }
    //console.log(inputDate)
    let difference = currentDate.minus({ years: inputDate.year, months: inputDate.month, days: inputDate.day });
    //console.log(difference)
    setFinalYears(difference.year);
    setFinalMonths(difference.month);
    setFinalDays(difference.day);
  }
  return (
    <main>
      <section className='formSection' >
        <form id='mainForm' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="day" id='dayLabel'>DAY</label> <br />
            <input type="number" name="day" id="day" value={inputs.day || ""} onChange={handleChange} placeholder='DD' />
            <p id="inputErrorDay" className='inputError'></p>
          </div>
          <div>
            <label htmlFor="month" id='monthLabel'>MONTH</label> <br />
            <input type="number" name="month" id="month" placeholder='MM' value={inputs.month || ""} onChange={handleChange} />
            <p id="inputErrorMonth" className='inputError'></p>
          </div>
          <div>
            <label htmlFor="year" id='yearLabel'>YEAR</label> <br />
            <input type="number" name="year" id="year" placeholder='YYYY' value={inputs.year || ""} onChange={handleChange} min='1900' />
            <p id="inputErrorYear" className='inputError'></p>
          </div>
        </form>
      </section>
      <div className='separator'>
        <hr />
        <button type='submit' form='mainForm'>
          <img src={IconArrow} alt="Arrow icon" />
        </button>
      </div>
      <section className='resultSection'>
        <p><span className='resultNumber'>{finalYears}</span> years</p>
        <p><span className='resultNumber'>{finalMonths}</span> months</p>
        <p><span className='resultNumber'>{finalDays}</span> days</p>
      </section>
    </main>
  )
}

export default App
