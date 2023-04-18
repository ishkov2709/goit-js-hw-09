const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

let intervalId = 0;

btnStopEl.disabled = true;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

document.body.addEventListener('click', evt => {
  evt.target.disabled = true;
  const dataValue = Object.keys(evt.target.dataset).join('');
  if (dataValue === 'start') {
    btnStopEl.disabled = false;
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
  if (dataValue === 'stop') {
    btnStartEl.disabled = false;
    clearInterval(intervalId);
  }
});
