const Home = require("../model/home");
const express = require("express");
const path = require("path");
const rootDir = require("../utils/pathUtil");
exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};
// const registerHome = [];
exports.getHostHome = (req, res, next) => {
  Home.fetchAll().then(([registerHome, field]) => {
    res.render("host/hostHomelist", {
      registerHome: registerHome,
      pageTitle: "airbnb List",
    });
  });

  //getting and sending html file
};

exports.postAddHome = (req, res, next) => {
  console.log("Home Registration is Sucessfull for", req.body.housename);
  //console.log(req.body);

  const home = new Home(
    req.body.housename,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photo,
    req.body.description
  );
  //registerHome.push(req.body)
  home.save();
  res.render("host/homeAdded");
  // res.sendFile(path.join(rootDir, "views", "host/homeAdded.html"));
};

exports.postEditHome = (req, res, next) => {
  // console.log("Home Registration is Sucessfull for", req.body.housename);
  //console.log(req.body);

  const home = new Home(
    req.body.housename,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photo,
    req.body.description,
    req.body.id
  );
  //registerHome.push(req.body)
  home.save();

  res.sendFile(path.join(rootDir, "views", "host/homeAdded.html"));
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  let registerHome = [];

  // console.log(homeId);
  Home.fetchAll().then(([registerHome, field]) => {
    registerHome = registerHome;
  });

  Home.deleteById(homeId)
    .then(() => {
      res.render("host/hostHomelist", {
        registerHome: registerHome,
        pageTitle: "airbnb List",
      });
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    });
};
// exports.registerHome = registerHome;
