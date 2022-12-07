import './scss/app.scss';
import mark from '../assets/icons/mark.svg';
import check from '../assets/icons/check.svg';
import cross from '../assets/icons/cross.svg';
import plus from '../assets/icons/plus.svg';
import ControllerTODO from "./js/controller/controller";
import ModelTODO from "./js/model/model";
import ViewTODO from "./js/view/view";


export default class AppTODO {
    init = (root, initalState, Model = ModelTODO, View = ViewTODO, Controller = ControllerTODO) => {
        const model = new Model(initalState);
        const controller = new Controller(model);
        const view = new View(root, controller);

        model.addSubscriber(view);
        view.mount(root);
    }
}