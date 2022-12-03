export default (task) => {
    const li = document.createElement('li');
    li.classList.add('todo__task');
    li.textContent = task;

    return li;
}