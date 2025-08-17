const mongooes = require("mongoose");
const userSchema = mongooes.Schema({
  firstName: { type: String, required: [true, "first name is required"] },
  lastName: { type: String, required: [true, "Last name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "password is required"] },
  usertype: { type: String, enum: ["Guest", "Host"], default: "Guest" },
  favourite: [{ type: mongooes.Schema.Types.ObjectId, ref: "Home" }],
});

module.exports = mongooes.model("User", userSchema);
