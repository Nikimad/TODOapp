import createButton from "./createButton";

export default (task, onUpdate, onClick, onDelete) => {
    const taskWrapper = document.createElement('li');
    const updateButton = createButton(['todo__task__update'], () => onUpdate(task.id));
    const deleteButton = createButton(['todo__task__delete'], () => onDelete(task.id));
    const text = document.createElement('p');

    taskWrapper.classList.add('todo__task', `todo__task_${task.status}`);
    text.classList.add('todo__task__text');

    text.textContent = task.text;
    text.addEventListener('click', () => onClick(id));

    taskWrapper.append(updateButton, text, deleteButton);

    return taskWrapper;
}