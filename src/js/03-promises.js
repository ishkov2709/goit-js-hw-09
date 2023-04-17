import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const btnCreateEl = document.querySelector('button[type="submit"]');
const inputDelayEl = document.querySelector('input[name="delay"]');
const inputStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');

btnCreateEl.addEventListener('click', onClickMakeArrayP);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          )
        );
      } else {
        reject(
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          )
        );
      }
    }, delay);
  });
}

function onClickMakeArrayP(evt) {
  evt.preventDefault();
  let delay = parseInt(inputDelayEl.value);
  const promises = [];
  for (let i = 1; i <= parseInt(inputAmountEl.value); i += 1) {
    if (i > 1) {
      delay += parseInt(inputStepEl.value);
    }

    promises.push(createPromise(i, delay));
  }
  return Promise.all(promises)
    .then(res => res)
    .catch(res => res);
}
