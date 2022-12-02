export default () => {
    const container = document.createElement('div');
    const form = document.createElement('form');
    const textInput = document.createElement('input');
    const submitInput = document.createElement('input');
    const list = document.createElement('ul');

    container.classList.add('todo__container');
    form.classList.add('todo__form');
    textInput.classList.add('todo__input');
    submitInput.classList.add('todo__submit');
    list.classList.add('todo__list');

    textInput.setAttribute('type', 'text');
    submitInput.setAttribute('type', 'submit');

    form.append(textInput, submitInput);
    container.append(form, list);

    return container;
}