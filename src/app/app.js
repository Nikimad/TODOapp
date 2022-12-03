import getAppDOM from './render/getAppDOM';
import mount from './mount';
import watcher from './watcher/watcher';
import renderList from './render/renderList';
import addTask from './addTask';


export default (root) => {
    const todoDOM = getAppDOM();
    const form = todoDOM.querySelector('form');
    const list = todoDOM.querySelector('ul');

    mount(root, todoDOM);

    const state = watcher({
        tasks: []
    }, () => renderList(list, state.tasks));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const taskName = formData.get('taskName');

        addTask(state, taskName);

        e.target.reset();
    });
}