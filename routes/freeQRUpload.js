const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyparser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const path = require("path");
const date = require("date-utils");
const crypto = require("crypto-js");
const bodyParser = "";
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.use(bodyparser.urlencoded({ extended: false }));

const connection = require("../config/mysql");

router.post(
  "/freeQRUpload",
  upload.fields([{ name: "picFile1" }, { name: "videoFile" }]),
  (req, res) => {
    let Pic = [];
    let Video = [];
    const obj = JSON.parse(JSON.stringify(req.files));
    console.log(obj);
    if (obj.picFile1 != undefined) {
      Pic.push(obj.picFile1[0].path);
      if (obj.picFile1[1] != undefined) {
        Pic.push(obj.picFile1[1].path);
      }
      if (obj.picFile1[2] != undefined) {
        Pic.push(obj.picFile1[2].path);
      }
    }
    if (obj.videoFile != undefined) {
      Video.push(obj.videoFile[0].path);
    }
    setTimeout(function main() {
      console.log(Pic);
      console.log(Video);
      let link = req.body.Link;
      let qrlist = req.body.qrData;
      let pwn = req.body.pw;
      let pw = crypto.AES.encrypt(`${pwn}`, SecretKey).toString();
      let freeInfoTextn = req.body.freeInfoText;
      let freeInfoText = crypto.AES.encrypt(
        `${freeInfoTextn}`,
        SecretKey
      ).toString();

      connection.query(
        `update User_info set pw=?, freeInfoText=?, freePic="${Pic}", freeVideo="${Video}", link=?, freeInfo="1", used="1" where qrlist=?;`,
        [pw, freeInfoText, link, qrlist],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            res.send(true);
          }
        }
      );
    }, 2000);
  }
);

module.exports = router;
