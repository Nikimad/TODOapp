export default (onSubmit) => {
  const form = document.createElement('form');
  const textInput = document.createElement('input');
  const submitInput = document.createElement('input');

  form.classList.add('todo__form');
  textInput.classList.add('todo__input');
  submitInput.classList.add('todo__submit');

  textInput.setAttribute('type', 'text');
  textInput.setAttribute('name', 'text');
  textInput.setAttribute('placeholder', 'Add new task');
  submitInput.setAttribute('type', 'submit');

  submitInput.value = '';
  textInput.pattern = '.*\\S.*';

  form.append(textInput, submitInput);
  
  textInput.addEventListener('focusout', () => {
    const submitEvent = new SubmitEvent('submit');

    form.dispatchEvent(submitEvent);
  });
  form.addEventListener('submit', onSubmit);

  return form;
};
