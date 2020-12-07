const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyparser = require("body-parser");
const multer = require("multer");
const qrcode = require("qrcode");
const upload = multer();
router.use(upload.array());
router.use(bodyparser.urlencoded({ extended: false }));
const connection = require("../config/mysql.js");

router.post("/showYear", (req, res) => {
  connection.query(`select distinct year from User_info;`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

module.exports = router;
