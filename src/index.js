import './scss/body.scss';
import AppTODO from './app/app';

const root = document.querySelector('.root');

const app = new AppTODO();

app.init(root);
