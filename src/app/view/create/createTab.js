export default (name, active, onClick) => {
    const tabWrapper = document.createElement('li');
    const tabName = document.createElement('a');

    tabWrapper.classList.add('todo__tab');
    tabName.classList.add(`todo__tab__${name}`);
    if (active) {
        tabName.classList.add(`active`);
    }

    tabName.setAttribute('data-name', name);

    tabName.addEventListener('click', onClick);

    tabWrapper.append(tabName);

    return tabWrapper;
}