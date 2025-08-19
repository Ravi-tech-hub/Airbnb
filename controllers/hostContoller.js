const Home = require("../model/home");
const express = require("express");
exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    isLoggedIn: req.isLoggedIn,
    editing: false,
    user: req.session.user,
  });
};
// const registerHome = [];
exports.getHostHome = (req, res, next) => {
  Home.find().then((registerHome) => {
    res.render("host/hostHomelist", {
      registerHome: registerHome,
      pageTitle: "airbnb List",
      isLoggedIn: req.isLoggedIn,
       user: req.session.user,
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
      res.redirect("hostHomelist");
    })
    .catch((err) => {
      console.log("Error saving home:", err);
      res.status(500).send("Error saving home");
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, housename, price, location, rating, description } = req.body;
  console.log("Post Edit home called", id);
  Home.findById(id)
    .then((home) => {
      home.housename = housename;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.description = description;

      if (req.file) {
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.log("Error while deleting file ", err);
          }
        });
        home.photo = req.file.path;
      }

      home
        .save()
        .then((result) => {
          console.log("Home updated ", result);
        })
        .catch((err) => {
          console.log("Error while updating ", err);
        });
      res.redirect("hostHomelist");
    })
    .catch((err) => {
      console.log("Error while finding home ", err);
    });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/hostHomelist");
    }

    console.log(homeId, editing, home);
    res.render("host/addHome", {
      home: home,
      pageTitle: "Edit your Home",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      Home.find().then((registerHome) => {
        console.log(registerHome);
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
