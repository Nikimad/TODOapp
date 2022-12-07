export default (classes) => {
    const list = document.createElement('ul');
    list.classList.add([...classes]);

    return list;
}