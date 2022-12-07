import create from "./create/create";

export default class ViewTODO {
    constructor(root, controller) {
        this.root = root;
        this.controller = controller;
        //  DOM
        this.container = this.create.container(['todo__container']);
        this.tabs = this.create.list(['todo__tabs']);
        this.list = this.create.list(['todo__list']);
        this.counter = this.create.counter();
    }

    create = create

    listener = (state) => this.render(state);

    initRender = () => {
        const header = this.create.container(['todo__header']);
        const updateAllButton = this.create.button(['todo__button__updateAll'], this.controller.updateAll);
        const form = this.create.form(this.controller.onSubmit);
        const body = this.create.container(['todo__body']);

        header.append(updateAllButton, form);
        body.append(this.counter, this.tabs, this.list);

        this.container.append(header, body);
    }

    renderCounter = (value) => {
        this.counter.textContent = `Items left: ${value}`;
    }

    renderTabs = (activeName) => {
        this.tabs.innerHTML = '';

        const allTab = this.create.tab('all', 'All', 'all' === activeName , this.controller.choseTab);
        const undoneTab = this.create.tab('undone', 'Active', 'undone' === activeName , this.controller.choseTab);
        const doneTab = this.create.tab('done', 'Completed', 'done' === activeName , this.controller.choseTab);


        this.tabs.append(allTab, undoneTab, doneTab);
    }

    renderList = (tasks) => {
        this.list.innerHTML = '';

        const tasksDOM = tasks.map((task) => this.create.task(task, 
            this.controller.taskHandler.onUpdate,
            this.controller.taskHandler.updateTask,
            this.controller.taskHandler.onDelete
            )
        );

        this.list.append(...tasksDOM);
    }

    getTasks = (tasks, active) => {
        const map = {
            'all': () => tasks,
            'done': () => tasks.filter((task) => task.status === 'done'),
            'undone': () => tasks.filter((task) => task.status === 'undone'),
        }

        return map[active]();
    }

    render = (state) => {
        const { tasks, finished, active } = state;

        this.renderCounter(finished);
        this.renderTabs(active);
        this.renderList(this.getTasks(tasks, active));
    }

    mount = (root) => {
        this.initRender();

        root.replaceWith(this.container);
    }
};
