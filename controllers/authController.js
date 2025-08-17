const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
exports.getlogin = (req, res, next) => {
  res.render("auth/Login", {
    isLoggedIn: false,
    pageTitle: "Login",
    error: {},
    oldInput: { email: "" },
  });
};
exports.postlogin = async (req, res, next) => {
  // console.log(req.body);
  // res.cookie("isLoggedIn", true);
  // req.isLoggedIn = true;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "SignUp",
      isLoggedIn: false,
      error: ["user does not exist"],
      oldInput: { email },
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "SignUp",
      isLoggedIn: false,
      error: ["Invalid password"],
      oldInput: { email },
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
};
exports.postlogout = (req, res, next) => {
  // res.cookie("isLoggedIn", false);
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
exports.getsignup = (req, res, next) => {
  res.render("auth/SignUp", {
    isLoggedIn: false,
    pageTitle: "Sign up",
    error: [],
    oldInput: { firstName: "", lastName: "", email: "", usertype: "" },
  });
};
exports.postsignup = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name should be at least 2 character long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name should contain only Alphabets"),

  check("LastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last name should contain only Alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid Email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password Should be 8 character long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast  one upper case")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast  one Lower case")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast  one number")
    .matches(/[!@$&]/)
    .withMessage("Password should contain atleast  one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password not match");
      }
      return true;
    }),

  check("usertype")
    .notEmpty()
    .withMessage("please select user type")
    .isIn(["Guest", "Host"])
    .withMessage("Invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("You must accept terms and condition")
    .custom((value, { req }) => {
      if (value != "on") {
        throw new Error("Please accept terms and condition");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, usertype } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).render("auth/signUp", {
        pageTitle: "SignUp",
        isLoggedIn: false,
        error: error.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, password, usertype },
      });
    }
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          usertype,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log("error catched", err);
        return res.status(422).render("auth/signUp", {
          pageTitle: "SignUp",
          isLoggedIn: false,
          error: [err],
          oldInput: { firstName, lastName, email, password, usertype },
        });
      });
  },
];
