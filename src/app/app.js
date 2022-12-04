import ControllerTODO from "./controller/controller";
import ModelTODO from "./model/model";
import ViewTODO from "./view/view";


export default (root) => {
    const model = new ModelTODO({ tasks: [], finished: 0 });
    const controller = new ControllerTODO(model);
    const view = new ViewTODO(root, controller);

    model.view = view;
    view.mount(root);
}