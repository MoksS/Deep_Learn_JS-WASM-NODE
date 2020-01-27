import { Socket } from "net";

const socket = new Socket();

const send = message => {
  console.log("Client >", message);
  socket.write(message);
};

socket.on("data", data => {
  console.log("Server >", data.toString(), data);
  setTimeout(() => socket.destroy(), 3000);
});

socket.on("drain", () => {
  console.log("Event: 🤷");
});

socket.on("end", () => {
  console.log("Event: 🏁");
  console.dir({
    bytesRead: socket.bytesRead,
    bytesWritten: socket.bytesWritten
  });
});

socket.on("error", err => {
  console.log("Event: 💩");
  console.log(err);
});

socket.on("timeout", () => {
  console.log("Event: ⌛");
});

socket.on("connect", () => {
  send("💋");
  send("💋");
  send("💋");
});

socket.connect({
  port: 2000,
  host: "127.0.0.1"
});
