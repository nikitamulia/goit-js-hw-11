const startRef = document.querySelector('button[data-start]');
const stopRef = document.querySelector('button[data-stop]');

startRef.addEventListener('click', changeColor);
stopRef.addEventListener('click', stopChangeColor);

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function changeColor(){ 
  startRef.disabled = true;
  stopRef.disabled = false;
  switchColor();
  timerId = setInterval(()=> {
    switchColor()
}, 1000);
}

function stopChangeColor(){
    clearInterval(timerId);
    startRef.disabled = false;
    stopRef.disabled = true;
}

function switchColor(){
  document.body.style.backgroundColor = getRandomHexColor()
}