const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;
app.use(express.static("public"));
server.listen(port, () => {
  console.log("Socket.IO Server running at http://localhost:${port}/");
});

io.on("connection", (socket) => {
  console.log(`A client with id ${socket.id} connected to the chat!`);
  socket.on("chatMessage", (msg) => {
    io.emit("newChatMessage", msg);
  });
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected!`);
  });
});
