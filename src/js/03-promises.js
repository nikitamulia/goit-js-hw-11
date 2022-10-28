import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event){
  event.preventDefault();

  const formDelay = Number(form.elements.delay.value);
  const formStep = Number(form.elements.step.value);
  const formAmount = Number(form.elements.amount.value);

  for(let i = 0; i < formAmount; i += 1){
    let delayStep = formDelay + formStep * i;

  createPromise(i + 1, delayStep)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}
  
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
  if (shouldResolve) {
   resolve({position, delay})
  } else {
   reject({position, delay})
  }
  }, delay)
  })
}