export default class ModelTODO {
  constructor(initalState = { tasks: [], finished: 0, active: 'all' }) {
    this.state = initalState;
  }

  subscribers = [];

  setState = (state) => {
    const { updatedTasks, finished, active } = state;

    this.state.tasks = updatedTasks ?? this.state.tasks;
    this.state.finished = finished ?? this.state.finished;
    this.state.active = active ?? this.state.active;

    this.subscribers.forEach((subscriber) => subscriber.listener(this.state));
  };

  addTask = (task) => {
    const { tasks } = this.state;

    const updatedTasks = [task, ...tasks];

    this.setState({ updatedTasks });
  };

  deleteTask = (id) => {
    const { tasks } = this.state;

    const taskIndex = tasks.findIndex((task) => task.id === id);

    const updatedTasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    const doneTasks = updatedTasks.filter((task) => task.status === 'done');

    this.setState({ updatedTasks, finished: doneTasks.length });
  };

  toggleAllTasksStatus = () => {
    const { tasks, finished } = this.state;

    const map = {
      allDone: () => tasks.map((task) => Object.assign(task, { status: 'done' })),
      allUndone: () => tasks.map((task) => Object.assign(task, { status: 'undone' })),
    };

    const updatedTasks = finished !== tasks.length ? map.allDone() : map.allUndone();
    const doneTasks = updatedTasks.filter((task) => task.status === 'done');

    this.setState({ updatedTasks, finished: doneTasks.length });
  };

  toggleTaskStatus = (id) => {
    const { tasks } = this.state;

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newStatus = task.status === 'done' ? 'undone' : 'done';

        return Object.assign(task, { status: newStatus });
      }

      return task;
    });
    const doneTasks = updatedTasks.filter((task) => task.status === 'done');

    this.setState({ updatedTasks, finished: doneTasks.length });
  };

  updateTaskText = (id, text) => {
    const { tasks } = this.state;

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return Object.assign(task, { text });
      }

      return task;
    });

    this.setState({ updatedTasks });
  };

  updateActive = (active) => this.setState({ active });

  deletAllCompleted = () => {
    const { tasks } = this.state;

    const updatedTasks = tasks.filter((task) => task.status === 'undone');
    const doneTasks = updatedTasks.filter((task) => task.status === 'done');

    this.setState({ updatedTasks, finished: doneTasks.length });
  };

  addSubscriber = (subscriber) => {
    this.subscribers = [...this.subscribers, subscriber];

    subscriber.listener(this.state);
  };
}
