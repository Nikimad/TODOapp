export default (name, text, active, chooseFilter) => {
  const tab = document.createElement('li');

  tab.classList.add('todo__tab', `todo__tab__${name}`);
  if (active) {
    tab.classList.add('todo__tab_active');
  }

  tab.setAttribute('data-name', name);

  tab.textContent = text;

  tab.addEventListener('click', chooseFilter);

  return tab;
};
