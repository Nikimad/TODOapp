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
        const input = document.createElement('input');
        input.setAttribute('type', 'text')
        input.setAttribute('autofocus', true);
        input.value = e.target.textContent;

        input.addEventListener('focusout', () => updateTask(task.id, input.value))

        e.target.replaceWith(input);
    });

    taskWrapper.append(updateButton, text, deleteButton);

    return taskWrapper;
}