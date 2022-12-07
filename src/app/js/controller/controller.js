export default class ControllerTODO {
  constructor(model) {
    this.model = model;
  }

  addTask = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get('text');
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
    e.preventDefault();
    const map = {
      'focusout': () => e.target.parentNode,
      'submit': () => e.target
    }

    const form = map[e.type]();

    const formData = new FormData(form);
    const text = formData.get('text');

    this.model.update(id, text);
  };

  replace = (id) => this.model.edit(id);

  delete = (id) => this.model.delete(id)

  deleteAll = () => this.model.clearCompleted();
}
