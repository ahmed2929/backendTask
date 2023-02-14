const Express = require("express");
const Router = Express.Router();
const dataObjectsController =require("../controller/index.js")

Router.get(
    "/dataObjects",
    dataObjectsController.findAllDataObject
);
Router.get(
    "/dataObjects/:id",
    dataObjectsController.findOneDataObject
);

Router.post(
    "/dataObjects",
    dataObjectsController.createDataObject
);

Router.put("/elements/:id/parent",
    dataObjectsController.SetLinkDataObject
);

Router.delete("/dataObjects/:id",
    dataObjectsController.deleteDataObject
);
module.exports = Router;