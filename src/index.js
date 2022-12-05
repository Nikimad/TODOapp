import AppTODO from "./app/app";
import ModelTODO from "./app/model/model";
import ViewTODO from "./app/view/view";
import ControllerTODO from "./app/controller/controller";

const root = document.querySelector('.root');

const app = new AppTODO();

app.init(ModelTODO, ViewTODO, ControllerTODO, root);