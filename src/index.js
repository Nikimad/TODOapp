import TODOview from "./todoApp/view/view";
import TODOapp from "./todoApp/app";

const root = document.querySelector('.root');

const todo = new TODOapp(() => {}, TODOview, () => {});

todo.init(root);