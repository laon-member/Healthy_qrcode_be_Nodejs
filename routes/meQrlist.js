const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const multer = require("multer");
const upload = multer();
router.use(upload.array());
router.use(bodyparser.urlencoded({ extended: false }));
const connection = require("../config/mysql");

router.post("/meQRlist/:id", (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let year = req.body.year;
    console.log(year);
    console.log(id);
    connection.query(
      `SELECT * FROM User_info where year =? ORDER BY qrlist, used limit ?, 10`,
      [year, id],
      (err, result) => {
        if (err) {
          res.status(500);
          res.send(err);
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
