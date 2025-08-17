const mongooes = require("mongoose");
const homeSchema = mongooes.Schema({
  housename: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photo: { type: String },
  description: { type: String },
});
// if host delete home from home list then it also delete from fav list of user for that we define prehooks
// homeSchema.pre("findOneAndDelete", async function (next) {
//   const homeId = this.getQuery()._id;
//   // await favourite.deleteMany({ houseid: homeId });
//   next();
//});
module.exports = mongooes.model("Home", homeSchema);
