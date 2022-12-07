import createButton from "./createButton";

export default (task, onUpdate, updateTask, onDelete) => {
    const taskWrapper = document.createElement('li');
    const updateButton = createButton(['todo__task__update'], () => onUpdate(task.id));
    const deleteButton = createButton(['todo__task__delete'], () => onDelete(task.id));
    const text = document.createElement('p');

    taskWrapper.classList.add('todo__task', `todo__task_${task.status}`);
    text.classList.add('todo__task__text');

    text.textContent = task.text;
    text.addEventListener('dblclick', (e) => {
        const form = document.createElement('form');
        const input = document.createElement('input');
        form.classList.add('todo__task__form');
        input.classList.add('todo__task__input');
        input.setAttribute('type', 'text');
        input.value = e.target.textContent;

        form.append(input);

        input.addEventListener('focusout', () => updateTask(task.id, input.value));
        form.addEventListener('submit', () => updateTask(task.id, input.value))

        e.target.parentNode.replaceWith(form);
        input.focus();
    });

    taskWrapper.append(updateButton, text, deleteButton);

    return taskWrapper;
}