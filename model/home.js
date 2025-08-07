//fake database
let registerHome = [];
const db = require("../utils/database");

module.exports = class Home {
  constructor(housename, price, location, rating, photo, description, id) {
    this.housename = housename;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
    this.description = description;
    this.id = id;
  }
  save() {
    return db.execute(
      "INSERT INTO homes (housename, price, location, rating, image, deccription) VALUES (?, ?, ?, ?, ?, ?)",
      [
        this.housename,
        this.price,
        this.location,
        this.rating,
        this.photo,
        this.description,
      ]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);
  }
  static deleteById(homeId) {
    return db.execute("DELETE  FROM homes WHERE id=?", [homeId]);
  }
};
