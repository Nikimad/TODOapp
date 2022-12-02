import create from "./create";

export default class TODOview {
    static create = create;

    constructor(root) {
        this.root = root;
        this.container = TODOview.create();
        this.list = this.container.querySelector('ul');
    }

    mount = () => this.root.replaceWith(this.container);
}