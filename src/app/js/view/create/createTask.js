import createButton from './createButton';

export default (task, toggleTask, updateTask, deleteTask, replace) => {
  if (task.edit) {
    const form = document.createElement('form');
    const input = document.createElement('input');

    form.classList.add('todo__task__form');
    input.classList.add('todo__task__input');

    input.setAttribute('type', 'text');
    input.setAttribute('name', 'text');

    input.value = task.text;

    form.append(input);

    input.addEventListener('focusout', (e) => updateTask(e, task.id));
    form.addEventListener('submit', (e) => updateTask(e, task.id));

    return form;
  }

  const taskWrapper = document.createElement('li');
  const updateButton = createButton(['todo__task__update'], () => toggleTask(task.id));
  const deleteButton = createButton(['todo__task__delete'], () => deleteTask(task.id));
  const text = document.createElement('p');

  taskWrapper.classList.add('todo__task', `todo__task_${task.status}`);
  text.classList.add('todo__task__text');

  text.textContent = task.text;

  text.addEventListener('dblclick', () => replace(task.id));

  taskWrapper.append(updateButton, text, deleteButton);

  return taskWrapper;
};
