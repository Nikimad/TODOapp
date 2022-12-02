export default class TODOapp {
    constructor(model, view, controller) {
        this.model = model;
        this.view = view;
        this.controller = controller;
    }

    init = (root) => {
        const view = new this.view(root);

        view.mount();
    }
}