const socket = io();

const formUser = document.querySelector("#formUser");
const inputUser = document.querySelector("#inputUser");
const messages = document.querySelector("#messages");
const formMessage = document.querySelector("#formMessage");
const inputMessage = document.querySelector("#inputMessage");
const userContainer = document.querySelector("#userContainer");

let myUser;

// kopplar submit
formUser.addEventListener("submit", function (e) {
  e.preventDefault();
  myUser = inputUser.value;
  userContainer.innerHTML = `<h2>Välkommen ${myUser}</h2>`;
  document.querySelector("#user").style.display = none;
  document.querySelector("#message").style.display = block;
});

// visar chathistorik (allt som alla skickat)
socket.on("chatMessage", (msg) => {
  io.emit("newChatMessage", msg.user + ":" + msg.message);
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  let user = msg.user;
  let message = msg.message;

  //spara till mongoDB
  const newMessage = newMessageModel({
    message: message,
    user: user,
    date: dateTime,
  });
  newMessage.save();
});
