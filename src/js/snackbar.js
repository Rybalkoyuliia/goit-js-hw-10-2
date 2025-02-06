import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const radiobtns = document.getElementsByName('state');
const delayInput = document.getElementsByName('delay')[0];

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let selectedRadioValue = null;

  for (let radio of radiobtns) {
    if (radio.checked) {
      selectedRadioValue = radio.value;
      break;
    }
  }

  const delayValue = Number(delayInput.value);
  if (delayValue < 0) {
    alert('Plese select positive value of delay');
    return;
  }
  const promise = new Promise((resolve, reject) => {
    if (selectedRadioValue === 'fulfilled') {
      setTimeout(() => {
        resolve();
      }, delayValue);
    } else if (selectedRadioValue === 'rejected') {
      setTimeout(() => {
        reject();
      }, delayValue);
    }
  });

  promise
    .then(() => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delayValue}ms`,
      });
    })
    .catch(() => {
      iziToast.error({
        message: `❌ Rejected promise in ${delayValue}ms`,
      });
    })
    .finally(form.reset());
}
