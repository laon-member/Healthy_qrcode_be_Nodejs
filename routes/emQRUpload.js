const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyparser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const bodyparserKorea = require("../config/KoreaEmergency");
const multer = require("multer");
const upload = multer();
router.use(upload.array());
const connection = require("../config/mysql");
const nodeRsa = require("node-rsa");
const crypto = require("crypto-js");
const bodyParser = "";

router.post("/emQRUpload", (req, res) => {
  try {
    let bloodTypen = req.body.bloodType;
    let birthDayn = req.body.birthDay;
    let sexn = req.body.sex;
    let sergeryn = req.body.sergery;
    let sergeryUsern = req.body.sergeryUser;
    let illn = req.body.ill;
    let illUsern = req.body.illUser;
    let medicinen = req.body.medicine;
    let medicineUsern = req.body.medicineUser;
    let alergyn = req.body.alergy;
    let alergyUsern = req.body.alergyUser;
    let sideEffn = req.body.sideEff;
    let phonen = req.body.phone;
    let phoneUsern = req.body.phoneUser;
    let othersn = req.body.others;
    let pwn = req.body.pw;
    let qrlist = req.body.qrlist;

    let bloodType = crypto.AES.encrypt(`${bloodTypen}`, SecretKey).toString();
    let birthDay = crypto.AES.encrypt(`${birthDayn}`, SecretKey).toString();
    let sex = crypto.AES.encrypt(`${sexn}`, SecretKey).toString();
    let sergery = crypto.AES.encrypt(`${sergeryn}`, SecretKey).toString();
    let sergeryUser = crypto.AES.encrypt(
      `${sergeryUsern}`,
      SecretKey
    ).toString();
    let ill = crypto.AES.encrypt(`${illn}`, SecretKey).toString();
    let illUser = crypto.AES.encrypt(`${illUsern}`, SecretKey).toString();
    let medicine = crypto.AES.encrypt(`${medicinen}`, SecretKey).toString();
    let medicineUser = crypto.AES.encrypt(
      `${medicineUsern}`,
      SecretKey
    ).toString();
    let alergy = crypto.AES.encrypt(`${alergyn}`, SecretKey).toString();
    let alergyUser = crypto.AES.encrypt(`${alergyUsern}`, SecretKey).toString();
    let sideEff = crypto.AES.encrypt(`${sideEffn}`, SecretKey).toString();
    let phone = crypto.AES.encrypt(`${phonen}`, SecretKey).toString();
    let phoneUser = crypto.AES.encrypt(`${phoneUsern}`, SecretKey).toString();
    let others = crypto.AES.encrypt(`${othersn}`, SecretKey).toString();
    let pw = crypto.AES.encrypt(`${pwn}`, SecretKey).toString();

    connection.query(
      `update User_info set pw=?, 
      bloodType=?, 
      age=?, 
      sex=?, 
      sergery=?, 
      ill=?, 
      medicine=?, 
      alergy=?, 
      sideEff=?, 
      phone=?, 
      others=?, 
      freeInfo="0",
      used="1",
      sergeryFree=?, 
      illFree=?, 
      medicineFree=?, 
      alergyFree=?, 
      addPhone=? 
      where qrlist=?;`,
      [
        pw,
        bloodType,
        birthDay,
        sex,
        sergery,
        ill,
        medicine,
        alergy,
        sideEff,
        phone,
        others,
        sergeryUser,
        illUser,
        medicineUser,
        alergyUser,
        phoneUser,
        qrlist,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send(true);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
