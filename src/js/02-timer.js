import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

// Variables

const inputCalendar = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const timeValue = document.querySelectorAll('.value');
let intervatId = 0;

// Base options

btnStartEl.disabled = true;

// Options flatpickr

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.parse(calendar.selectedDates[0]);
    if (currentDate <= Date.now()) {
      btnStartEl.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    btnStartEl.disabled = false;
    btnStartEl.addEventListener('click', () => {
      btnStartEl.disabled = true;
      inputCalendar.disabled = true;
      intervatId = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(
          currentDate - Date.now()
        );
        // Update Timer
        [...timeValue].forEach(el => {
          if (Object.keys(el.dataset).includes('days')) {
            el.textContent = days;
          } else if (Object.keys(el.dataset).includes('hours')) {
            el.textContent = hours;
          } else if (Object.keys(el.dataset).includes('minutes')) {
            el.textContent = minutes;
          } else if (Object.keys(el.dataset).includes('seconds')) {
            el.textContent = seconds;
          }
        });
        if (currentDate - Date.now() < 1000) {
          inputCalendar.disabled = false;
          clearInterval(intervatId);
        }
      }, 1000);
    });
  },
};

let calendar = flatpickr('#datetime-picker', options);

// Functions

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString(10).padStart(2, '0');
}
