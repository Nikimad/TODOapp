import create from './create/create';

export default class ViewTODO {
  constructor(root, controller) {
    this.root = root;
    this.controller = controller;
    //  DOM
    this.container = this.create.container(['todo__container']);
    this.tabs = this.create.list(['todo__tabs']);
    this.list = this.create.list(['todo__list']);
    this.deletAllCompleted = this.create.button(
      ['todo__deleteAll', 'd-none'],
      this.controller.deleteAll,
    );
    this.counter = this.create.counter();
  }

  create = create;

  listener = (state) => this.render(state);

  initRender = () => {
    const header = this.create.container(['todo__header']);
    const toggleAll = this.create.button(
      ['todo__toggleAll'],
      this.controller.toggleAll,
    );
    const form = this.create.form(this.controller.addTask);
    const body = this.create.container(['todo__body']);
    const wrapper = this.create.container(['todo__wrapper']);

    this.deletAllCompleted.textContent = 'Clear completed';

    wrapper.append(this.counter, this.tabs);
    header.append(toggleAll, form);
    body.append(wrapper, this.list, this.deletAllCompleted);
    this.container.append(header, body);
  };

  renderCounter = (count) => {
    this.counter.textContent = `Items left: ${count}`;
  };

  renderTabs = (filterName) => {
    this.tabs.innerHTML = '';

    const allTab = this.create.tab(
      'all',
      'All',
      filterName === 'all',
      this.controller.chooseFilter,
    );
    const undoneTab = this.create.tab(
      'undone',
      'Active',
      filterName === 'undone',
      this.controller.chooseFilter,
    );
    const doneTab = this.create.tab(
      'done',
      'Completed',
      filterName === 'done',
      this.controller.chooseFilter,
    );

    this.tabs.append(allTab, undoneTab, doneTab);
  };

  renderList = (tasks, filter) => {
    this.list.innerHTML = '';

    const tasksMap = {
      all: () => tasks,
      done: () => tasks.filter((task) => task.status === 'done'),
      undone: () => tasks.filter((task) => task.status === 'undone'),
    };

    const tasksDOM = tasksMap[filter]().map((task) => this.create.task(
      task,
      this.controller.toggle,
      this.controller.update,
      this.controller.delete,
      this.controller.replace,
    ));

    this.list.append(...tasksDOM);
    this.list.querySelector('input')?.focus();
  };

  toggleDeleteButton = (all, count) => {
    this.deletAllCompleted.classList[all > count ? 'remove' : 'add']('d-none'); 
  }

  render = (state) => {
    const { tasks, count, filter } = state;

    this.renderCounter(count);
    this.renderTabs(filter);
    this.renderList(tasks, filter);
    this.toggleDeleteButton(tasks.length, count);
  };

  mount = () => {
    this.initRender();

    this.root.replaceWith(this.container);
  };
}
