const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyparser = require("body-parser");
const multer = require("multer");
const qrcode = require("qrcode");
const upload = multer();
router.use(upload.array());
router.use(bodyparser.urlencoded({ extended: false }));

router.post("/MakeQR", async (req, res) => {
  try {
    let qrlist = req.body.qrlist;
    let qrUrl = `http://localhost:8080/qrlist/:${qrlist}`;
    console.log(qrUrl);
    qrcode.toDataURL(qrUrl, (err, url) => {
      const data = url.replace(/.*,/, "");
      const img = Buffer.from(data, "base64");
      let fileName = "QRCODE.png";
      res.writeHead(200, {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": "image/png",
      });
      return res.end(img);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
