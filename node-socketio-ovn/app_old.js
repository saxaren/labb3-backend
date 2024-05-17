const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

// klistrat från models
const diceModel = require("./models/diceModel");

// exports.getMessages = async (req, res) => {
//   try {
//     // console.log("Kom igen nu!");
//     const allMessages = await messageModel.find();
//     // console.log("Kom igen nu2!");
//     return res.status(200).json(allMessages);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`A client with id ${socket.id} connected to the chat!`);

  socket.on("rollDice", async (data) => {
    console.log(data.user, data.result, data.sum);
    io.emit("diceRolled", {
      user: data.user,
      result: data.result,
      sum: data.sum,
    });

    Save to MongoDB
    try {
      const dicecountInfo = new DicecountModel({
        user: data.user,
        dicecount: diceResult,
        dicecountSum: diceResult,
      });
      await dicecountInfo.save();
      console.log("Dice roll saved to MongoDB.", diceResult);
    } catch (error) {
      console.error("Error saving dice roll to MongoDB: ", error);
    }
  });

  socket.on("chatMessage", (msg) => {
    io.emit("newChatMessage", {
      user: msg.user,
      message: msg.message,
      inputColor: msg.inputColor,
    });
  });
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected!`);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO Server running at http://localhost:${port}/`);
});

setInterval(() => {
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  io.emit("time", time);
}, 1000);
