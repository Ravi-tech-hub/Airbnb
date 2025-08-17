const express = require("express");
const authRouter = express.Router();
//local module

const authController = require("../controllers/authController");
authRouter.get("/login", authController.getlogin);
authRouter.post("/login", authController.postlogin);
authRouter.post("/logout", authController.postlogout);
authRouter.get("/signup", authController.getsignup);
authRouter.post("/signup", authController.postsignup);
module.exports = authRouter;
//exports.registerHome = registerHome;
