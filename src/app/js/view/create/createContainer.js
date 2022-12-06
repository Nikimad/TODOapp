export default (classes) => {
    const container = document.createElement('div');
    container.classList.add(...classes);

    return container;
}