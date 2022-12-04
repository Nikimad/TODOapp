import getAppDOM from "../render/getAppDOM";

export default class ViewTODO {
    constructor(root, controller) {
        this.root = root;
        this.container = getAppDOM();
        this.controller = controller;

        //  temp
        this.container.querySelector('form').addEventListener('submit', controller.onSubmit);
    }

    render = (state) => console.log(state);

    observer = (state) => this.render(state);

    mount = (root) => root.replaceWith(this.container);
};