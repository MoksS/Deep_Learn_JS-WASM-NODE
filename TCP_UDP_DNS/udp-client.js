import dgram from "dgram";

const maessage = Buffer.from("hello");
const client = dgram.createSocket("udp4");

client.send("massge", 3000, "127.0.0.1", err => {
  if (err) {
    client.close();
    throw err;
  }
});
