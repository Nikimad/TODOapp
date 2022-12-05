export default class ControllerTODO {
    constructor(model) {
        this.model = model;
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const taskName = formData.get('taskName');
        const lastId = this.model.state.tasks.length > 0 ? this.model.state.tasks[0].id : 0;

        this.model.addTask({
            text: taskName,
            id: lastId + 1,
            status: 'undone'
        });

        e.target.reset();
    }

    choseTab = (e) => this.model.updateActive(e.target.dataset.name)
    
    updateAll = () => {console.log('Update all')}

    taskHandler = {
        onUpdate: (id) => this.model.toggleTaskStatus(id),
        onClick: (id) => console.log('update task text'),
        onDelete: (id) => this.model.deleteTask(id)
    }
}