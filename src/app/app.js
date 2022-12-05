import ControllerTODO from "./controller/controller";
import ModelTODO from "./model/model";
import ViewTODO from "./view/view";


export default class AppTODO {
    init = (Model, View, Controller, root, initalState) => {
        const model = new Model(initalState);
        const controller = new Controller(model);
        const view = new View(root, controller);

        model.addSubscriber(view);
        view.mount(root);
    }
}