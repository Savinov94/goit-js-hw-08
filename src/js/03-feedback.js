import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const updateLocalStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}, 500);
 
const fillFormFromLocalStorage = () => {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email || '';
    messageTextarea.value = formData.message || '';
  }
};


form.addEventListener('input', (event) => {
  updateLocalStorage();
});

window.addEventListener('load', fillFormFromLocalStorage);


form.addEventListener('submit', event => {
  event.preventDefault();
  

  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log('Форма відправлена з такими даними:', formData);

  emailInput.value = '';
  messageTextarea.value = '';
  localStorage.removeItem(LOCAL_STORAGE_KEY);
});