const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyparser = require("body-parser");
const multer = require("multer");
const upload = multer();
router.use(upload.array());
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const SecretKey = "Eb+hBV[{t8<,nW_&9Su{=Svgr[CW$654";
const connection = require("../config/mysql.js");
router.use(bodyparser.urlencoded({ extended: false }));

router.post("/reset", (req, res) => {
  let qrlist = req.body.qrlist;

  console.log(qrlist);
  connection.query(
    `update User_info set pw="", bloodType="", age="", 
    sex="", sergery="", ill="", medicine="", alergy="", 
    sideEff="", phone="", others="", freeInfo="0", used="0", 
    sergeryFree="", illFree="", medicineFree="", alergyFree="", 
    addPhone="" where qrlist = ?;`,
    [qrlist],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(true);
      }
    }
  );
});

module.exports = router;
