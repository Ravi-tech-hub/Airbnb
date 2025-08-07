const express = require("express");
const hostRouter = express.Router();
//local module
const rootDir = require("../utils/pathUtil");
const homesController = require("../controllers/hostContoller");

const path = require("path");
hostRouter.get(
  "/host/add-home",
  homesController.getAddHome
  // (req, res, next) => {
  // console.log(req.url, req.method);
  // res.sendFile(path.join(rootDir, "views", "addHome.html"));}
);

const registerHome = [];
hostRouter.post(
  "/host/add-home",
  homesController.postAddHome
  // (req, res, next) => {
  //   console.log("Home Registration is Sucessfull for", req.body.housename);
  //   //console.log(req.body);

  //   const home = new Home(
  //     req.body.housename,
  //     req.body.price,
  //     req.body.location,
  //     req.body.rating
  //   );
  //   console.log(req.url, req.method);

  //   //registerHome.push(req.body)
  //   home.save();

  //   res.sendFile(path.join(rootDir, "views", "host/homeAdded.html"));
  // }
);
hostRouter.get("/hostHomelist", homesController.getHostHome);
hostRouter.post("/deleteHome/:homeId", homesController.postDeleteHome);

exports.hostRouter = hostRouter;
//exports.registerHome = registerHome;
