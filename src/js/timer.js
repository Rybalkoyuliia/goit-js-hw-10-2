import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    newDate = selectedDates[0].getTime();
    if (newDate < Date.now()) {
      startButton.disabled = true;
      alert('You have to choose date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

let newDate = '';

const timeInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

startButton.disabled = true;

flatpickr(timeInput, options);

startButton.addEventListener('click', handleStart);

function handleStart() {
  startButton.disabled = true;

  const countdown = setInterval(() => {
    let diff = newDate - Date.now();
    if (diff >= 0) {
      let time = convertMilliseconds(diff);

      for (let t of timer.children) {
        if (
          t.lastElementChild.textContent === 'Days' ||
          t.lastElementChild.textContent === 'Day'
        ) {
          t.firstElementChild.textContent = String(time.days).padStart(2, '0');
          t.lastElementChild.textContent = time.minutes === 1 ? 'Day' : 'Days';
        } else if (
          t.lastElementChild.textContent === 'Hours' ||
          t.lastElementChild.textContent === 'Hour'
        ) {
          t.firstElementChild.textContent = String(time.hours).padStart(2, '0');
          t.lastElementChild.textContent =
            time.minutes === 1 ? 'Hour' : 'Hours';
        } else if (
          t.lastElementChild.textContent === 'Minutes' ||
          t.lastElementChild.textContent === 'Minute'
        ) {
          t.firstElementChild.textContent = String(time.minutes).padStart(
            2,
            '0'
          );
          t.lastElementChild.textContent =
            time.minutes === 1 ? 'Minute' : 'Minutes';
        } else if (
          t.lastElementChild.textContent === 'Seconds' ||
          t.lastElementChild.textContent === 'Second'
        ) {
          t.firstElementChild.textContent = String(time.seconds).padStart(
            2,
            '0'
          );
          t.lastElementChild.textContent =
            time.seconds === 1 ? 'Second' : 'Seconds';
        }
      }
    } else {
      clearInterval(countdown);
    }
  }, 1000);
}

function convertMilliseconds(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}
