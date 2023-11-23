const socket = io();

let username = null;

if (!username) {
  Swal.fire({
    title: "Welcome to chat",
    text: "Please enter your username",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Your username is required";
      }
    },
  }).then((input) => {
    username = input.value;
    socket.emit("newUser", username);
  });
}

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    username,
    message: message.value,
  });
  message.value = "";
});

socket.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data
    .map((msg) => {
      return `<p><strong>${msg.username}:</strong> ${msg.message}</p>`;
    })
    .join(" ");
  output.innerHTML = chatRender;
});

socket.on("newUser", (user) => {
  Toastify({
    text: `${user} joined the chat`,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username);
});

socket.on("chat:typing", (user) => {
  actions.innerHTML = `<p><em>${user} is typing a message...</em></p>`;
});
