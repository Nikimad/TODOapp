export default class ControllerTODO {
  constructor(model) {
    this.model = model;
  }

  getSubmitedText = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get('text').trim();

    return text;
  }

  addTask = (e) => {
    const text = this.getSubmitedText(e);

    if (text.length === 0) return;

    const lastId = this.model.state.tasks[0]?.id ?? 0;

    this.model.add({
      text: text,
      id: lastId + 1,
      status: 'undone',
      edit: false,
    });

    e.target.reset();
  };

  chooseFilter = (e) => this.model.updateFilter(e.target.dataset.name);

  toggleAll = () => this.model.toggleAll();

  toggle = (id) => this.model.toggle(id);

  update = (e, id) => {
    const text = this.getSubmitedText(e);

    text.length > 0 ? this.model.update(id, text) : this.model.delete(id);
  };

  replace = (id) => this.model.edit(id);

  delete = (id) => this.model.delete(id)

  deleteAll = () => this.model.clearCompleted();
}
