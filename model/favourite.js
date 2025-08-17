// const { getDb } = require("../utils/database");

// module.exports = class Favourite {
//   constructor(_id) {
//     this.houseId = _id;
//   }
//   save() {
//     const db = getDb();
//     return db
//       .collection("favourites")
//       .findOne({ houseId: this.houseId })
//       .then((existingFav) => {
//         if (!existingFav) {
//           return db.collection("favourites").insertOne(this);
//         }
//         return Promise.resolve();
//       });
//   }
//   static getFavouriteList() {
//     const db = getDb();
//     if (!db) {
//       return Promise.reject(new Error("Database not initialized"));
//     }
//     return db.collection("favourites").find().toArray();
//   }

//   static deleteById(delHomeId) {
//     const db = getDb();
//     return db.collection("favourite").deleteOne({ houseId: delHomeId });
//   }
// };
const mongooes = require("mongoose");
const favSchema = mongooes.Schema({
  houseId: {
    type: mongooes.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
    unique: true,
  },
});
module.exports = mongooes.model("Favourite", favSchema);
