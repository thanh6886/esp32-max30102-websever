const express = require("express");
const cors = require("cors");
const mqtt = require("mqtt");
const mysql = require("mysql");
const options_1 = {
  host: "cfdc549178f54de381adaf8a1f088efc.s2.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "mikehung611",
  password: "Nguyenvanhung2002",
};
const options_2 = {
  host: "f67a696c77714f8684b4aa51d801075d.s2.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "thanh2412",
  password: "Thanh2412",
};
const client_1 = mqtt.connect(options_1);
const client_2 = mqtt.connect(options_2);
const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mqtt_esp32",
});

function handleMySQLDisconnect() {
  connection.connect(function (err) {
    if (err) {
      console.log("Lỗi khi kết nối đến cơ sở dữ liệu:", err);
      setTimeout(handleMySQLDisconnect, 2000);
    }
    console.log("Đã kết nối đến cơ sở dữ liệu!");
  });

  connection.on("error", function (err) {
    console.log("Lỗi cơ sở dữ liệu", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleMySQLDisconnect();
    } else {
      throw err;
    }
  });
}
handleMySQLDisconnect();

client_1.on("connect", function () {
  client_1.subscribe("node_1", function (err) {
    if (err) {
      console.log("Lỗi khi subscribe sensor/update topic", err);
    } else {
      console.log("Đã subscribe sensor node_1");
    }
  });
});
client_2.on("connect", function () {
  client_2.subscribe("node_2", function (err) {
    if (err) {
      console.log("Lỗi khi subscribe sensor/update topic", err);
    } else {
      console.log("Đã subscribe sensor node_2");
    }
  });
});

client_1.on("message", function (topic, message) {
  const msg_str = message.toString();
  switch (topic) {
    case "node_1":
      const data_1 = JSON.parse(msg_str);
      console.log(data_1);
      // console.log("nhịp tim", data_1.heartbeat);
      // console.log("SPO2", data_1.Spo2);
      // console.log("nhiệt độ cơ thể", data_1.body_temperature);
      // console.log("nhiệt độ môi trường", data_1.Environment_temp);
      INSERT_SENSOR_DATA_1(data_1);
      break;
    // case "node_2":
    //   const data_2 = JSON.parse(msg_str);
    //   console.log(data_2);
    // console.log("nhịp tim", data_2.heartbeat);
    // console.log("SPO2", data_2.Spo2);
    // console.log("nhiệt độ cơ thể", data_2.body_temperature);
    // console.log("nhiệt độ môi trường", data_2.Environment_temp);
    // INSERT_SENSOR_DATA_2(data_2);
    // break;
    default:
  }
});

client_2.on("message", function (topic, message) {
  const msg_str = message.toString();
  switch (topic) {
    // case "node_1":
    // const data_1 = JSON.parse(msg_str);
    // console.log(data_1);
    // console.log("nhịp tim", data_1.heartbeat);
    // console.log("SPO2", data_1.Spo2);
    // console.log("nhiệt độ cơ thể", data_1.body_temperature);
    // console.log("nhiệt độ môi trường", data_1.Environment_temp);
    // INSERT_SENSOR_DATA_1(data_1);
    // break;
    case "node_2":
      const data_2 = JSON.parse(msg_str);
      console.log(data_2);
      // console.log("nhịp tim", data_2.heartbeat);
      // console.log("SPO2", data_2.Spo2);
      // console.log("nhiệt độ cơ thể", data_2.body_temperature);
      // console.log("nhiệt độ môi trường", data_2.Environment_temp);
      INSERT_SENSOR_DATA_2(data_2);
      break;
    default:
  }
});

function INSERT_SENSOR_DATA_1(value) {
  const sql_1 = `INSERT INTO datanode_1 (datetime, heartbeat, Spo2, body_temperature, Environment_temp) VALUES (NOW(),${value.heartbeat}, ${value.Spo2}, ${value.body_temperature}, ${value.Environment_temp})`;
  connection.query(sql_1, [value], function (err, result) {
    if (err) {
      console.log("Lỗi khi chèn dữ liệu cảm biến:", err);
    } else {
      console.log("Chèn dữ liệu  thành công từ node_1");
    }
  });
}
function INSERT_SENSOR_DATA_2(value) {
  const sql_2 = `INSERT INTO datanode_2 (datetime, heartbeat, Spo2, body_temperature, Environment_temp) VALUES (NOW(),${value.heartbeat}, ${value.Spo2}, ${value.body_temperature}, ${value.Environment_temp})`;
  connection.query(sql_2, [value], function (err, result) {
    if (err) {
      console.log("Lỗi khi chèn dữ liệu cảm biến:", err);
    } else {
      console.log("Chèn dữ liệu  thành công từ node_2");
    }
  });
}

app.get("/node", (req, res) => {
  const database_1 = "SELECT * FROM dataNode_1";
  const database_2 = "SELECT * FROM dataNode_2";
  connection.query(database_1, (err, result_1) => {
    if (err) throw err;
    connection.query(database_2, (err, result_2) => {
      res.send({ database_1: result_1, database_2: result_2 });
    });
  });
});

const server = app.listen(3000, () => {
  console.log(`Server đang chạy → PORT ${server.address().port}`);
});
