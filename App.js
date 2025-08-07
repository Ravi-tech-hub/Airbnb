//core module
const express = require("express");
const path = require("path");
app = express();
//Ejs ke liye
app.set("view engine", "ejs");
app.set("views", "views");

//Local module
const userRouter = require("./Route/userRouter");
const { hostRouter } = require("./Route/hostRouter");
const db = require("./utils/database");
// databse query:- db.execute--promise return karta hai



//root path
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/error");

//css file ko use karne ke liye
app.use(express.static(path.join(rootDir, "public")));

// app.use((req, res, next) => {
//   console.log(req.url, req.method);
//   next();
// });
app.use(express.urlencoded());
app.use(userRouter);
app.use(hostRouter);

//404 handling
app.use(errorController.pageNotFound);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on address http://localhost::${PORT}`);
});

// Dynamic UI using EJS
//Need of Dynamic UI:-
//1.personalized content
//2.dynamic data delivery
//3.security and acess control
//4.Localozation and internationalization:- according to different language
//Api versatility

//What is EJS:-Embeded Java script(tempalte engine)
//html with js :-ejs lets you embeded javascript code with html
//synatk:- <% %> for control flow and <%=%>

//MVC:-
//Mvc is a architectural patteren hai(alag alag chesso ki clear responsibility . folder structure define kar piye)
//Mvc stand for Model view controller :- A software architectural pattern for devleoping user interfaces
//Model:- Manages the data and business logics of application
//View:- Handle the display and presentation of data to the user
//Controller:- Process use input, interact with model and update the view accordingly
//Routes are part of controller
//Purpose:- mvc seprate concern within an application making it easier to manage and scale

//Dynamic Path
