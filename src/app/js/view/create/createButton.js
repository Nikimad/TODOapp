export default (classes, onClick) => {
  const button = document.createElement('button');
  button.classList.add(...classes);

  button.addEventListener('click', onClick);

  return button;
};
