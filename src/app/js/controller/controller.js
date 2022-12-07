export default class ControllerTODO {
  constructor(model) {
    this.model = model;
  }

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const taskName = formData.get('taskName');
    const lastId = this.model.state.tasks[0]?.id ?? 0;

    this.model.addTask({
      text: taskName,
      id: lastId + 1,
      status: 'undone',
    });

    e.target.reset();
  };

  choseTab = (e) => this.model.updateActive(e.target.dataset.name);

  updateAll = () => this.model.toggleAllTasksStatus();

  taskHandler = {
    onUpdate: (id) => this.model.toggleTaskStatus(id),
    updateTask: (id, text) => this.model.updateTaskText(id, text),
    onDelete: (id) => this.model.deleteTask(id),
  };

  delete = () => this.model.deletAllCompleted();
}
