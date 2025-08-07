const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ravi511104@",
  database: "airbnb",
  port: 3307,
});
module.exports = pool.promise();

// primary key:- it is complusory for all record and it is unique
