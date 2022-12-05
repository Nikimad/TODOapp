export default class ModelTODO {
    constructor(initalState = { tasks: [], finished: 0 }) {
        this.state = initalState;
    }

    subscribers = [];

    setState = (state) => {
        const { updatedTasks, finished } = state;

        this.state.tasks = [...updatedTasks];
        this.state.finished = finished;

        this.subscribers.forEach((subscriber) => subscriber.listener(this.state));
    }

    getAllTasks = () => {
        return this.state.tasks;
    }

    getDoneTasks = () => {
        return this.state.tasks.filter((task) => task.status === 'done');
    }

    getUndoneTasks = () => {
        return this.state.tasks.filter((task) => task.status === 'undone');
    }

    addTask = (task) => {
        const { tasks, finished } = this.state;

        const updatedTasks = [task, ...tasks];

        this.setState( { updatedTasks, finished });
    }

    deleteTask = (id) => {
        const { tasks } = this.state;

        const taskIndex = tasks.findIndex((task) => task.id == id);

        const updatedTasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
        const doneTasks = updatedTasks.filter((task) => task.status === 'done');

        this.setState( { updatedTasks, finished: doneTasks.length });
    }

    toggleAllTasksStatus = () => {
        const { tasks, finished } = this.state;

        const map = {
            allDone: () => tasks.map((task) => {
                task.status = 'done';

                return task;
            }),
            allUndone: () => tasks.map((task) => {
                task.status = 'undone';

                return task;
            }),
        }

        const updatedTasks = finished !== tasks.length ? map.allDone() : map.allUndone();
        const doneTasks = updatedTasks.filter((task) => task.status === 'done');
        
        this.setState( { updatedTasks, finished: doneTasks.length });
    }

    toggleTaskStatus = (id) => {
        const { tasks } = this.state;

        const updatedTasks = tasks.map((task) => {
            if (task.id == id) {
                tasks[taskIndex].status = tasks[taskIndex].status === 'done' ? 'undone' : 'done';
            }

            return task;
        });
        const doneTasks = updatedTasks.filter((task) => task.status === 'done');

        this.setState( { updatedTasks, finished: doneTasks.length });
    }

    updateTaskText = (id, text) => {
        const { tasks, finished } = this.state;

        const updatedTasks = tasks.map((task) => {
            if (task.id == id) {
                task.text = text;
            }

            return task;
        });

        this.setState( { updatedTasks, finished });
    }

    addSubscriber = (handler) => {
        this.subscribers = [...this.subscribers, handler];
    }
};