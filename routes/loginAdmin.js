const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyparser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const multer = require("multer");
const upload = multer();
router.use(upload.array());
const connection = require("../config/mysql");

router.post("/adminLogin", (req, res) => {
  try {
    let id = req.body.id;
    let pw = req.body.pw;
    console.log(id);
    console.log(pw);

    let token = jwt.sign(
      {
        id: id,
      },
      secretObj.secret,
      {
        expiresIn: "7200m",
      }
    );

    connection.query(
      `Select * from admin_account Where id=?;`,
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          if (result.length === 0) {
            console.log("일치하는 계정이 없음");
            res.send(false);
          } else {
            if (bcrypt.compareSync(pw, result[0].pw)) {
              res.send(token);
            } else {
              console.log("비밀번호가 틀렸어요.");
              res.send(false);
            }
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
