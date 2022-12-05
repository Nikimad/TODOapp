export default (value = 0) => {
    const counter = document.createElement('p');
    counter.classList.add('todo__counter');

    counter.textContent = `tasks left: ${value}`;

    return counter;
}