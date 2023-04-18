import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onClickMakeArrayP);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onClickMakeArrayP(evt) {
  evt.preventDefault();
  const formElements = evt.currentTarget.elements;
  let delay = parseInt(formElements.delay.value);
  for (let i = 1; i <= parseInt(formElements.amount.value); i += 1) {
    if (i > 1) {
      delay += parseInt(formElements.step.value);
    }

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  evt.currentTarget.reset();
}
