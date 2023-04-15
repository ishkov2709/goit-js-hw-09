const btnsEl = document.querySelectorAll('button');
let intervalId = 0;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

const onBtnsClrDisblAttr = evt => {
  btnsEl.forEach(el => {
    el.disabled = false;
    if (el === evt.target) {
      el.disabled = true;
    }
  });
};

document.body.addEventListener('click', evt => {
  const dataValue = Object.keys(evt.target.dataset).join('');
  if (dataValue === 'start') {
    onBtnsClrDisblAttr(evt);
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
  if (dataValue === 'stop') {
    onBtnsClrDisblAttr(evt);
    clearInterval(intervalId);
  }
});
