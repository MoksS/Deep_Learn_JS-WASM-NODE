import digram from "dgram";

const server = digram.createSocket("udp4");

server.on("message", (msg, info) => {
  console.dir({ msg, info });
});

server.bind(3000);
