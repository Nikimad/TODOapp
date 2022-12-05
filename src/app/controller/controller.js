export default class ControllerTODO {
    constructor(model) {
        this.model = model;
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const taskName = formData.get('taskName');

        this.model.addTask(taskName);

        e.target.reset();
    }
    choseTab = (e) => {console.log(`Choose tab: ${e.target.dataset.tab}`)}
    updateAll = () => {console.log('Update all')}
}