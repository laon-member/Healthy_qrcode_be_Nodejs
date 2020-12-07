const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyparser = require("body-parser");
const multer = require("multer");
const upload = multer();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt.js");
const connection = require("../config/mysql.js");
router.use(upload.array());
router.use(bodyparser.urlencoded({ extended: false }));

router.post("/UpdateAccount", (req, res) => {
  let id = req.body.id;
  let pwn = req.body.pw;

  let hash = bcryptjs.hashSync(pwn);

  connection.query(
    `Update admin_account set id=?, pw=? where id =?;`,
    [id, hash, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(true);
      }
    }
  );
});

module.exports = router;
