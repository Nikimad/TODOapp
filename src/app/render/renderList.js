import getTaskDOM from "./getTaskDOM";

export default (list, tasks) => {
    list.innerHTML = ''; 

    tasks.forEach((task) => list.append(getTaskDOM(task)));
};