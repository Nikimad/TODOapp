import './scss/app.scss';
import active from '../assets/icons/active.svg';
import completed from '../assets/icons/completed.svg';
import all from '../assets/icons/all.svg';
import mark from '../assets/icons/mark.svg';
import check from '../assets/icons/check.svg';
import cross from '../assets/icons/cross.svg';
import plus from '../assets/icons/plus.svg';
import ControllerTODO from './js/controller/controller';
import ModelTODO from './js/model/model';
import ViewTODO from './js/view/view';

export default class AppTODO {
  init = (
    root,
    Model = ModelTODO,
    View = ViewTODO,
    Controller = ControllerTODO,
  ) => {
    const initalState = JSON.parse(localStorage.getItem('state')) ?? undefined;
    const model = new Model(initalState);
    const controller = new Controller(model);
    const view = new View(root, controller);

    model.addSubscriber(view);
    view.mount(root);

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('state', JSON.stringify(model.state));
    });
  };
}
