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
      ['todo__button__delete', 'd-none'],
      this.controller.deleteAll,
    );
    this.counter = this.create.counter();
  }

  create = create;

  listener = (state) => this.render(state);

  initRender = () => {
    const header = this.create.container(['todo__header']);
    const toggleAll = this.create.button(
      ['todo__button__updateAll'],
      this.controller.toggleAll,
    );
    const form = this.create.form(this.controller.addTask);
    const body = this.create.container(['todo__body']);
    const wrapper = this.create.container(['todo__wrapper']);

    this.deletAllCompleted.textContent = 'Clear completed';

    header.append(toggleAll, form);
    wrapper.append(this.counter, this.tabs);
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

  renderList = (tasks) => {
    this.list.innerHTML = '';

    const tasksDOM = tasks.map((task) => this.create.task(
      task,
      this.controller.toggle,
      this.controller.update,
      this.controller.delete,
      this.controller.replace,
    ));

    this.list.append(...tasksDOM);
    this.list.querySelector('input')?.focus();
  };

  getTasks = (tasks, filter) => {
    const map = {
      all: () => tasks,
      done: () => tasks.filter((task) => task.status === 'done'),
      undone: () => tasks.filter((task) => task.status === 'undone'),
    };

    return map[filter]();
  };

  toggleDeleteButton = (all, count) => {
    this.deletAllCompleted.classList[all > count ? 'remove' : 'add']('d-none'); 
  }

  render = (state) => {
    const { tasks, count, filter } = state;

    this.renderCounter(count);
    this.renderTabs(filter);
    this.renderList(this.getTasks(tasks, filter));
    this.toggleDeleteButton(tasks.length, count);
  };

  mount = (root) => {
    this.initRender();

    root.replaceWith(this.container);
  };
}
