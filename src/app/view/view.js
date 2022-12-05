import getAppDOM from "../render/getAppDOM";

export default class ViewTODO {
    constructor(root, controller) {
        this.root = root;
        this.appDOM = getAppDOM();
        this.controller = controller;
    }

    listener = (state) => this.render(state);

    mount = (root) => {
        this.appDOM.querySelector('form').addEventListener('submit', this.controller.onSubmit);

        root.replaceWith(this.appDOM);
    }

    render = (state) => {
        const { tasks, finished } = state;

        const list = this.appDOM.querySelector('ul');
        list.innerHTML = ''

        tasks.forEach((task) => {
            const li = document.createElement('li');

            li.textContent = task;

            list.append(li);
        });
    }
};
