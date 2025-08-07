const express = require("express");
const Home = require("../model/home");
exports.gethomes = (req, res, next) => {
  Home.fetchAll().then(([registerHome, field]) => {
    res.render("store/homelist", {
      registerHome: registerHome,
      pageTitle: "airbnb List",
    });
  });

  //getting and sending html file
};

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registerHome, field]) => {
    res.render("store/index", {
      registerHome: registerHome,
      pageTitle: "airbnb Home",
    });
  });

  //getting and sending html file
};
exports.getBooking = (req, res, next) => {
  // console.log(req.url, req.method);
  // // res.send(`<h1>Welcome to airbnb</h1>
  // // <a href="/host/add-home">Add home</a>`);
  // const registerHome = Home.fetchAll((registerHome) => {
  res.render("store/booking", {
    pageTitle: "airbnb Home",
  });
  // });
};

exports.getfavouriteList = (req, res, next) => {
  Home.fetchAll().then(([registerHome, field]) => {
    res.render("store/favrouiteList", {
      registerHome: registerHome,
      pageTitle: "airbnb Home",
    });
  });
};

// exports.getHomeDeatils = (req, res, next) => {
//   console.log(req.url, req.method);
//   // res.send(`<h1>Welcome to airbnb</h1>
//   // <a href="/host/add-home">Add home</a>`);
//   const registerHome = Home.fetchAll((registerHome) => {
//     res.render("store/homelist", {
//       registerHome: registerHome,
//       pageTitle: "airbnb List",
//     });
//   });
// };

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];

    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      console.log("Home deatil", home);
      res.render("store/homeDetail", {
        home: home,
        pageTitle: "Home Detail",
      });
    }
  });
};
