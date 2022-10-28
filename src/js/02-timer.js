import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputRef = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysFor = document.querySelector('[data-days]');
const hoursFor = document.querySelector('[data-hours]');
const minutesFor = document.querySelector('[data-minutes]');
const secondsFor = document.querySelector('[data-seconds]');


startBtn.disabled = true;
let timerId = null;

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
  let timeNow = Date.now()
  let deltaTime = selectedDates[0] - timeNow;

  if(deltaTime < 0){
    Notiflix.Notify.failure("Please choose a date in the future")
    startBtn.disabled = true
  } else{
    startBtn.disabled = false
  
  }




  function startTimer(){
    startBtn.disabled = true
    inputRef.disabled = true
    liveTimer(selectedDates)
    timerId = setInterval(() => {
      liveTimer(selectedDates)
    }, 1000)
  }

  startBtn.addEventListener('click', startTimer)
},
};
function liveTimer(selectedDates){
  let timeNow = Date.now()
  let deltaTime = selectedDates[0] - timeNow;
  if(deltaTime < 1000){
    clearInterval(timerId)
  }
  updateDataTime(deltaTime)
}

function updateDataTime(deltaTime){
  const {days, hours, minutes, seconds} = convertMs(deltaTime)

  daysFor.textContent = days;
  hoursFor.textContent = hours;
  minutesFor.textContent = minutes;
  secondsFor.textContent = seconds;
}
flatpickr(inputRef, options);

function convertMs(ms) {
// Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Remaining days
const days = addLeadingZero(Math.floor(ms / day));
// Remaining hours
const hours = addLeadingZero(Math.floor((ms % day) / hour));
// Remaining minutes
const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
// Remaining seconds
const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};