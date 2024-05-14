const socket = io();

const messages = document.querySelector("#messages");
const form = document.querySelector("#form");
const input = document.querySelector("#input");

// kopplar submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chatMessage", input.value);
    input.value = "";
  }
});

// visar chathistorik (allt som alla skickat)
socket.on("newChatMessage", function (msg) {
  let item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
});
