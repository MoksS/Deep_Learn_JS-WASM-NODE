import net from "net";

const server = net.createServer(socket => {
  socket.setNoDelay(true);
  socket.write("☺");

  socket.on("data", data => {
    console.log("Event: 📨", data);
    console.log("Data:", data.toString());
  });

  socket.on("drain", () => {
    console.log("Event: 🤷");
  });

  socket.on("end", () => {
    console.log("Event: 🏁");
    console.dir({
      bytedRead: socket.bytesRead,
      bytesWritten: socket.bytesWritten
    });
  });

  socket.on("timeout", () => {
    console.log("event timout");
  });

  socket.on("error", err => {
    console.error(err);
  });
});

server.on("connection", socket => {
  console.dir({
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remoteFamily: socket.remoteFamily,
    remotePort: socket.remotePort,
    bufferSize: socket.bufferSize
  });
});

server.listen(2000);
