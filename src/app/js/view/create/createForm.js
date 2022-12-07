export default (onSubmit) => {
  const form = document.createElement('form');
  const textInput = document.createElement('input');
  const submitInput = document.createElement('input');

  form.classList.add('todo__form');
  textInput.classList.add('todo__input');
  submitInput.classList.add('todo__submit');

  textInput.setAttribute('type', 'text');
  textInput.setAttribute('name', 'taskName');
  textInput.setAttribute('placeholder', 'Add new task');
  submitInput.setAttribute('type', 'submit');
  submitInput.value = '';

  form.append(textInput, submitInput);

  form.addEventListener('submit', onSubmit);

  return form;
};
