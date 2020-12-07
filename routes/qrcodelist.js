const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyparser = require("body-parser");
const multer = require("multer");
const upload = multer();
router.use(upload.array());
const dateUtil = require("date-utils");
const connection = require("../config/mysql");
const qrcode = require("qrcode");
const fs = require("fs");
const zipFolder = require("zip-folder");
const AdmZip = require("adm-zip");
let zip = new AdmZip();
router.use(bodyparser.urlencoded({ extended: false }));

router.post("/qrlist", async (req, res) => {
  try {
    let qrlist = req.body.qrlist;
    let date = new Date();
    let dateFormat = date.toFormat("YYYY-MM-DD");
    let random = Math.random().toString(36);
    let date2 = new Date(2021, 6);
    let date2Format = date2.toFormat("YYYY");
    fs.mkdirSync(`./server/img/${random}`);
    await (function makeQR() {
      for (let i = 1; i <= qrlist; i++) {
        let random1 = Math.random().toString(36).substr(2, 11);
        let qrlist = dateFormat + random1;
        let qrUrl = `http://localhost:8080/qrlist/:${qrlist}`;
        connection.query(
          `insert into User_info(qrlist, freeInfo, used, year) values(?, "0", "0", ?);`,
          [qrlist, date2Format],
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        qrcode.toDataURL(qrUrl, (err, url) => {
          const data = url.replace(/.*,/, "");
          const img = Buffer.from(data, "base64");
          fs.writeFile(
            `/Users/hongdaehyeon/Desktop/vuejs공부/vuejs공부/laonQR/server/img/${random}/${qrlist}.png`,
            img,
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`${qrUrl} 저장성공`);
              }
            }
          );
        });
      }
    })();
    setTimeout(function makeZip() {
      zip.addLocalFolder(
        `/Users/hongdaehyeon/Desktop/vuejs공부/vuejs공부/laonQR/server/img/${random}`
      );
      // get everything as a buffer
      var zipFileContents = zip.toBuffer();
      const fileName = "uploads.zip";
      const fileType = "application/zip";
      res.writeHead(200, {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": fileType,
      });
      return res.end(zipFileContents);
    }, 4000);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
