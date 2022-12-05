export default class ViewTODO {
    constructor(root, controller) {
        this.root = root;
        this.controller = controller;
    }

    dynamicDOM = {
        counter: null,
        tabs: null,
        list: null
    } 

    createContainer = () => {
        const container = document.createElement('todo__container');
        container.classList.add('todo__container');

        return container;
    }

    renderUpdateAllButton = (container) => {
        const button = document.createElement('button');
        button.classList.add('todo__button_updateAll');
        //  main event
        button.addEventListener('click', this.controller.updateAll);

        button.textContent = 'Update All';//  TODO: delete after styling

        container.append(button);
    }

    renderForm = (container) => {
        const form = document.createElement('form');
        const textInput = document.createElement('input');
        const submitInput = document.createElement('input');

        form.classList.add('todo__form');
        textInput.classList.add('todo__input');
        submitInput.classList.add('todo__submit');

        textInput.setAttribute('type', 'text');
        textInput.setAttribute('name', 'taskName');
        submitInput.setAttribute('type', 'submit');
        //  form content
        form.append(textInput, submitInput);
        //  main event
        form.addEventListener('submit', this.controller.onSubmit);

        container.append(form);
    }

    renderHeader = (container) => {
        const header = document.createElement('div');
        header.classList.add('todo__header');
        //  header content
        this.renderUpdateAllButton(header);
        this.renderForm(header);

        container.append(header);
    }

    renderCounter = (container, value = 0) => {
        const counter = document.createElement('p');
        counter.classList.add('todo__counter');

        counter.textContent = `tasks left: ${value}`;

        container.append(counter);
    }

    renderTabs = (container) => {
        const tabs = document.createElement('ul');
        tabs.classList.add('todo__tabs');

        const tab1 = document.createElement('li');
        const allTab = document.createElement('a');
        const tab2 = document.createElement('li');
        const doneTab = document.createElement('a');
        const tab3 = document.createElement('li');
        const undoneTab = document.createElement('a');

        tab1.classList.add('tab');
        tab2.classList.add('tab');
        tab3.classList.add('tab');

        allTab.classList.add('todo__tab_all');
        doneTab.classList.add('todo__tab_done');
        undoneTab.classList.add('todo__tab_undone');

        allTab.setAttribute('data-tab', 'all');
        doneTab.setAttribute('data-tab', 'done');
        undoneTab.setAttribute('data-tab', 'undone');

        allTab.addEventListener('click', this.controller.choseTab);
        doneTab.addEventListener('click', this.controller.choseTab);
        undoneTab.addEventListener('click', this.controller.choseTab);

        allTab.textContent = 'all';
        doneTab.textContent = 'done';
        undoneTab.textContent = 'undone';

        tab1.append(allTab);
        tab2.append(doneTab);
        tab3.append(undoneTab);

        tabs.append(tab1, tab2, tab3);

        container.append(tabs);
    }

    renderList = (container) => {
        const list = document.createElement('ul');
        list.classList.add('todo__list');

        container.append(list);
    }

    renderBody = (container) => {
        const body = document.createElement('div');
        body.classList.add('todo__body');
        //  body content
        this.renderCounter(body);
        this.renderTabs(body);
        this.renderList(body)


        container.append(body);
    }

    listener = (state) => this.render(state);

    mount = (root) => {
        const container =  this.createContainer();
        this.renderHeader(container);
        this.renderBody(container);

        this.dynamicDOM.counter = container.querySelector('todo__counter');
        this.dynamicDOM.tabs = container.querySelector('todo__tabs');
        this.dynamicDOM.list = container.querySelector('todo__list');

        root.replaceWith(container);
    }

    render = (state) => {
        const { tasks, finished, active } = state;
    }
};
