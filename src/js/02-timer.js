import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const textDateTime = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

const currentTime = new Date();
let timer = null;
let inputTime = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        btnStart.setAttribute("disabled", true);
        inputTime = selectedDates[0].getTime();

        if (selectedDates[0] <= currentTime) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            btnStart.removeAttribute("disabled");
        }
        return inputTime;
    },
};

flatpickr(textDateTime, options);

btnStart.addEventListener("click", onStart);

function onStart() {
    timer = setInterval(() => {
        let currentTimeNew = new Date().getTime();
        const msTimer = inputTime - currentTimeNew;
        if (msTimer > 0) {  
            const { days, hours, minutes, seconds } = convertMs(msTimer);
            daysTimer.textContent = addLeadingZero(days);
            hoursTimer.textContent = addLeadingZero(hours);
            minutesTimer.textContent = addLeadingZero(minutes);
            secondsTimer.textContent = addLeadingZero(seconds);
        } 
        else clearInterval();
    }, 1000);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  // Remaining 
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}