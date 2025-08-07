const express = require("express");
const path = require("path");
const rootDir = require("../utils/pathUtil");
exports.pageNotFound = (req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
};
