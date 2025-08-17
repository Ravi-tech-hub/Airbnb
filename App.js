//core module
const express = require("express");
const path = require("path");
app = express();
const multer = require("multer");

const rootDir = require("./utils/pathUtil");
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

const DB_PATH =
  "mongodb+srv://root:Ravi511104%40@learing.5i39vit.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Learing";
//Ejs ke liye
app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");
//Local module
const userRouter = require("./Route/userRouter");
const hostRouter = require("./Route/hostRouter");
const authRouter = require("./Route/authRoute");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// databse query:- db.execute--promise return karta hai
const randomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const multerOption = {
  storage,
  fileFilter,
};

app.use(express.urlencoded());
app.use(multer(multerOption).single("photo"));

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});
app.use(
  session({
    secret: "Ravi511104",
    resave: false,
    saveUninitialized: true,
    store: store,
    //after giving store it start storing object into store of mongo db
  })
);
app.use((req, res, next) => {
  //by cookie
  // req.isLoggedIn = req.get("cookie")
  //   ? req.get("cookie").split("=")[1] === "true"
  //   : false;
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(userRouter);
app.use(hostRouter);
app.use(authRouter);

//session
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
});

app.use("/host", hostRouter);

//404 handling
app.use(errorController.pageNotFound);
const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("COnnect to mongooes");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting Mongooes", err);
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

// Introduction to mongoose
//Mongoose is an object Data Modeling(ODM) library for mongoDb and node.js
//provide a schema based solution(strucutral  based)

//cookies:-small priece of data stored in user browser by server //they help website remember user information and preferences betweem page load or visit
//Adding login functionality

// session:-session are server-side storage mechanism that track user interaction with website

//Auntentication:- it is process of veriying the identity of user or system acessing an application
//it esnure that only authorozied user can protected resource and feature

//authorization is process of determing what action a user is permited to perform within application
