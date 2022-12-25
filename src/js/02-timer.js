import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  picker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  field: document.querySelector('.field'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentTime = Date.now();
    const chosenTime = selectedDates[0].getTime();
    if (currentTime >= chosenTime) {
      window.alert('Please choose a date in the future');
      refs.startButton.disabled = true;
      return;
    }
    refs.startButton.disabled = false;
  },
};

refs.startButton.addEventListener('click', startTimer);
function startTimer() {
  timer.start();
}
const fp = flatpickr('#datetime-picker', options);
const timer = {
  intervalId: null,

  start() {
    const finishTime = fp.selectedDates[0].getTime();
    const currentTime = Date.now();
    const deltaTime = finishTime - currentTime;
    const time = convertMs(deltaTime);

    updateInformation(time);

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = finishTime - currentTime;
      console.log(deltaTime);
      const time = convertMs(deltaTime);

      if (finishTime - currentTime <= 0) {
        clearInterval(this.intervalId);

        return;
      }

      updateInformation(time);
    }, 1000);
  },
};

function updateInformation({ days, hours, minutes, seconds }) {
  refs.days.textContent = days.toString().padStart(2, '0');
  refs.hours.textContent = hours.toString().padStart(2, '0');
  refs.minutes.textContent = minutes.toString().padStart(2, '0');
  refs.seconds.textContent = seconds.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));