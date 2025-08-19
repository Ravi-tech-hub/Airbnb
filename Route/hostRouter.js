const express = require("express");
const hostRouter = express.Router();
//local module
const rootDir = require("../utils/pathUtil");
const homesController = require("../controllers/hostContoller");

const path = require("path");
hostRouter.get("/host/add-home", homesController.getAddHome);
hostRouter.post("/host/add-home", homesController.postAddHome);
hostRouter.get("/hostHomelist", homesController.getHostHome);
hostRouter.get("/edit-home/:homeId", homesController.getEditHome);
hostRouter.post("/edit-home", homesController.postEditHome);

hostRouter.post("/deleteHome/:homeId", homesController.postDeleteHome);

module.exports = hostRouter;
//exports.registerHome = registerHome;
