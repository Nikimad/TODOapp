export default (state, task) => {
    const { tasks } = state;

    state.tasks = [task, ...tasks];
}