const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "hong4383server.r-e.kr",
  user: "hong4383",
  password: "ghdeogus16!",
  port: "3306",
  database: "qrcode",
});
function handleDisconnect() {
  connection.connect((err) => {
    if (err) {
      console.log(
        "데이터베이스 접근에 실패하였습니다. 관리자에게 문의해주세요"
      );
      console.log(err);
      setTimeout(handleDisconnect, 2000);
    }
    connection.on("error", (err) => {
      if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        console.log(err);
        return handleDisconnect();
      } else if (err.code === "ETIMEOUT") {
        return handleDisconnect();
      } else if (err.code === "ECONNERESET") {
        return handleDisconnect();
      } else {
        throw err;
      }
    });
  });
}
handleDisconnect();

module.exports = connection;
