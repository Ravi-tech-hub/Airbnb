const express = require("express");
const Home = require("../model/home");
const User = require("../model/user");
exports.gethomes = (req, res, next) => {
  console.log("Get homes Called", req.session.user);
  Home.find().then((home) => {
    res.render("store/homelist", {
      registerHome: home,
      pageTitle: "airbnb List",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.getIndex = (req, res, next) => {
  Home.find().then((registerHome) => {
    console.log("session value", req.session.user);
    res.render("store/index", {
      registerHome: registerHome,
      pageTitle: "airbnb Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.postAddToFavourite = async (req, res, next) => {
  console.log("called add to fav");
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourite.includes(homeId)) {
    user.favourite.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.getBooking = (req, res, next) => {
  console.log("Get homes Called", req.session.user);
  res.render("store/booking", {
    pageTitle: "airbnb Home",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getfavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  console.log("Get favourite", userId);
  const user = await User.findById(userId).populate("favourite");
  console.log(user);
  console.log("Get homes Called", req.session.user);
  res.render("store/favrouiteList", {
    favouriteHome: user.favourite,
    pageTitle: "airbnb Home",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};
exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  console.log("Get homes Called", req.session.user);
  const user = await User.findById(userId);
  if (user.favourite.includes(homeId)) {
    user.favourite = user.favourite.filter((fav) => fav != homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.getHomeDetails = (req, res, next) => {
  console.log("Home Detail Called");
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    console.log("I am in find by Id home");
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      console.log("Home deatil", home);
      console.log("Get homes Called", req.session.user);
      res.render("store/homeDetail", {
        home: home,
        pageTitle: "Home Detail",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};
