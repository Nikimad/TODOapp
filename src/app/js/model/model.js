export default class ModelTODO {
  constructor(initalState = { tasks: [], count: 0, filter: 'all' }) {
    this.state = initalState;
  }

  subscribers = [];

  addSubscriber = (subscriber) => {
    this.subscribers = [...this.subscribers, subscriber];
  };

  sendEvent = () => {
    this.subscribers.forEach((subscriber) => subscriber.listener(this.state));
  };

  init = () => this.sendEvent();

  setState = (state) => {
    const { tasks, count, filter } = state;

    this.state.tasks = tasks ?? this.state.tasks;
    this.state.count = count ?? this.state.count;
    this.state.filter = filter ?? this.state.filter;

    this.sendEvent();
  };

  add = (task) => {
    const { tasks, count } = this.state;

    this.setState({ tasks: [task, ...tasks], count: count + 1 });
  };

  toggle = (id) => {
    const { tasks } = this.state;

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newStatus = task.status === 'done' ? 'undone' : 'done';

        return Object.assign(task, { status: newStatus });
      }

      return task;
    });
    const count = updatedTasks.filter((task) => task.status === 'undone').length;

    this.setState({ tasks: updatedTasks, count });
  };

  update = (id, text) => {
    const { tasks } = this.state;

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return Object.assign(task, { text,  edit: !task.edit });
      }

      return task;
    });

    this.setState({ tasks: updatedTasks });
  };

  edit = (id) => {
    const { tasks } = this.state;

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return Object.assign(task, { edit: !task.edit });
      }

      return task;
    });

    this.setState({ tasks: updatedTasks });
  }

  delete = (id) => {
      const { tasks } = this.state;
  
      const taskIndex = tasks.findIndex((task) => task.id === id);
  
      const updatedTasks = [
        ...tasks.slice(0, taskIndex),
        ...tasks.slice(taskIndex + 1),
      ];
  
      const count = updatedTasks.filter((task) => task.status === 'undone').length;
  
      this.setState({ tasks: updatedTasks, count });
  };

  toggleAll = () => {
    const { tasks, count } = this.state;

    const map = {
      allDone: () => tasks.map((task) => Object.assign(task, { status: 'done' })),
      allUndone: () => tasks.map((task) => Object.assign(task, { status: 'undone' })),
    };

    const updatedTasks = count !== 0 ? map.allDone() : map.allUndone();
    const updatedCount = updatedTasks.filter((task) => task.status === 'undone').length;

    this.setState({ tasks: updatedTasks, count: updatedCount });
  };

  clearCompleted = () => {
    const { tasks } = this.state;

    const updatedTasks = tasks.filter((task) => task.status === 'undone');

    this.setState({ tasks: updatedTasks });
  };

  updateFilter = (filter) => this.setState({ filter });
}
