const Home = require("../model/home");
const express = require("express");
exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    isLoggedIn: req.isLoggedIn,
  });
};
// const registerHome = [];
exports.getHostHome = (req, res, next) => {
  Home.find().then((registerHome) => {
    res.render("host/hostHomelist", {
      registerHome: registerHome,
      pageTitle: "airbnb List",
      isLoggedIn: req.isLoggedIn,
    });
  });
  //getting and sending html file
};

exports.postAddHome = (req, res, next) => {
  console.log("Home Registration is Sucessfull for", req.body.housename);
  //console.log(req.body);
  if (!req.file) {
    return res.redirect("host/addHome");
  }

  const { housename, price, location, rating, description } = req.body;
  const photo = req.file.path;
  console.log("Photo Path", photo);

  const home = new Home({
    housename,
    price,
    location,
    rating,
    photo,
    description,
  });
  //registerHome.push(req.body)
  home
    .save()
    .then(() => {
      console.log("Homes saved successfully");
      res.redirect("host/homeAdded", { isLoggedIn: req.isLoggedIn });
    })
    .catch((err) => {
      console.log("Error saving home:", err);
      res.status(500).send("Error saving home");
    });
};

exports.postEditHome = (req, res, next) => {
  const home = new Home(
    req.body.housename,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photo,
    req.body.description,
    req.body.id
  );
  home
    .save()
    .then(() => {
      console.log("Homes saved successfully");
      res.redirect("host/hostHomelist", { isLoggedIn: req.isLoggedIn });
    })
    .catch((err) => {
      console.log("Error saving home:", err);
      res.status(500).send("Error saving home");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      Home.find().then((registerHome) => {
        res.render("host/hostHomelist", {
          isLoggedIn: req.isLoggedIn,
          registerHome: registerHome,
          pageTitle: "airbnb List",
        });
      });
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
      res.status(500).send("Error deleting home");
    });
};
// exports.registerHome = registerHome;
