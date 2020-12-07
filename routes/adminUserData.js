const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyparser = require("body-parser");
const multer = require("multer");
const upload = multer();
router.use(upload.array());
const connection = require("../config/mysql");
const secretObj = require("../config/jwt.js");
router.use(bodyparser.urlencoded({ extended: false }));

router.post("/getData", (req, res) => {
  try {
    let pageNum = req.body.pageNum;

    connection.query(`select * from User_info`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
