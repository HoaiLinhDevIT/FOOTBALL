// var express = require("express");
// var app = express();
// var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Abcd1234",
//   database: "escrow-api",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!!!");
// });

// app.listen(3000, function () {
//   console.log("Node server running @ http://localhost:3000");
// });

// app.get('/public/home.html', function (req, res) {
//     var sql = "SELECT * FROM t_chat";
//     con.query(sql, function(err, results) {
//       if (err) throw err;
//       res.send(results);
//     });
//   });

const express = require("express");

const app = express();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abcd1234",
  database: "escrow-api",
});

const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
app.get("/", (req, res) => {
  res.send("Heello world");
});

var usernames = {};
var rooms = [];

io.on("connection", function (socket) {
  socket.on("createUser", function (username) {
    socket.username = username;
    usernames[username] = username;
  });

  socket.on("sendMessage", (data) => {
    console.log(`current rom =  ${socket.currentRoom}`);
    socket
      .to(socket.currentRoom)
      .emit("updateChat", { message: data.message, userName: socket.username });
    addMessageToDatabase(data);
  });

  socket.on("createRoom", function (room) {
    // console.log(rooms);
    if (room != null) {
      const val = rooms.find((e) => e.name === room);
      if (!val) {
        rooms.push({ id: socket.id, name: room });
        io.sockets.emit("updateRooms", rooms, null);
      }
    }
  });

  socket.on("updateRooms", function (room) {
    socket.leave(socket.currentRoom);
    socket.currentRoom = room;
    socket.join(room);
  });
});

http
  .listen(3000, function () {
    console.log("Listening to port 3000.");
  })
  .on("error", function (e) {
    console.log("cannot connect to server");
  });

function addMessageToDatabase(data) {
  var sql =
    "INSERT INTO t_chat (request_no, user_id, message, date_time, mine, ex_key, del_flg, create_date, create_by, update_date, update_by) VALUES (?)";
  var value = [
    data.requestNo,
    data.userId,
    data.message,
    data.dateTime,
    data.mine,
    "0",
    "0",
    data.createDate,
    data.userId,
    data.createDate,
    data.userId,
  ];
  try {
    con.query(sql, [value]);
  } catch (error) {
    console.log('cannot insert data to table t_chat. Please contact to admin.')
    console.log(error);
  }
}
