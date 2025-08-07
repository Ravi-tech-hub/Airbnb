//core module
const path = require("path");

//local module
const rootDir = require("../utils/pathUtil");
const Home = require("../model/home");
// const { registerHome } = require("./hostRouter");

//external  module
const express = require("express");
const { registerHome } = require("./hostRouter");
const userRouter = express.Router();
const homesController = require("../controllers/storeController");
userRouter.get(
  "/",
  homesController.getIndex
  //   (req, res, next) => {
  //   console.log(req.url, req.method);
  //   // res.send(`<h1>Welcome to airbnb</h1>
  //   // <a href="/host/add-home">Add home</a>`);
  //   const registerHome = Home.fetchAll((registerHome) => {
  //     res.render("store/homelist", {
  //       registerHome: registerHome,
  //       pageTitle: "airbnb Home",
  //     });
  //   });
  //   const homesController=require("/booking".homesController.getBooking)
  //   //getting and sending html file
  // }
);
userRouter.get("/homes", homesController.gethomes);
userRouter.get("/booking", homesController.getBooking);

userRouter.get("/favrouiteList", homesController.getfavouriteList);
userRouter.get("/homes/:homeId", homesController.getHomeDetails);

module.exports = userRouter;
