import { io } from "socket.io-client";

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");
const socket = io("http://localhost:3000");

// Listening to events coming from the server
socket.on("connect", () => {
    displayMessage(`You are connected to the ${socket.id}`);
});

socket.on('receive-message', message => {
    displayMessage(message);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;
    if (message === "") return;
    displayMessage(message);
    // Listening to custom events coming from the client to server 
     socket.emit('send-message', message, room);

    messageInput.value = "";
});

joinRoomButton.addEventListener("click", (e) => {
    const room = roomInput.value;
    socket.emit("join-room",room, message => {
        displayMessage(message);
    } )
});

function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("message-container").append(div);
}
