import getAppDOM from './render/getAppDOM';
import mount from './mount';

const root = document.querySelector('.root');
const todoDOM = getAppDOM();

mount(root, todoDOM);