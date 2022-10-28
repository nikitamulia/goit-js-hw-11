import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event){
  event.preventDefault();

  let formDelay = +form.elements.delay.value;
  const formStep = +form.elements.step.value;
  const formAmount = +form.elements.amount.value;

  for(let i = 0; i < formAmount; i += 1)
  createPromise(i + 1, (formDelay += formStep))
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
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

