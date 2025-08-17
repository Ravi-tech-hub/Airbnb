const express = require("express");
const userRouter = express.Router();
const homesController = require("../controllers/storeController");
userRouter.get("/", homesController.getIndex);
userRouter.get("/homes", homesController.gethomes);
userRouter.get("/booking", homesController.getBooking);
userRouter.get("/favourites", homesController.getfavouriteList);

userRouter.get("/homes/:homeId", homesController.getHomeDetails);
userRouter.post("/favourites", homesController.postAddToFavourite);

userRouter.post(
  "/favourites/delete/:homeId",
  homesController.postRemoveFromFavourite
);

module.exports = userRouter;
