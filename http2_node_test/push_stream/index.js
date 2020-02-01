import http2 from "http2";
import fs from "fs";
import mime from "mime";
import path from "path";

const dirname = path.resolve();
const HTTP2_PORT = 443;
const serverOptions = {
  key: fs.readFileSync(`${dirname}/secret/key.pem`),
  cert: fs.readFileSync(`${dirname}/secret/cert.pem`)
};

// read and send file content in the stream
const sendFile = (stream, fileName) => {
  const fd = fs.openSync(fileName, "r");
  const stat = fs.fstatSync(fd);
  const headers = {
    "content-length": stat.size,
    "last-modified": stat.mtime.toUTCString(),
    "content-type": mime.getType(fileName)
  };
  stream.respondWithFD(fd, headers);
  stream.on("close", () => {
    console.log("closing file", fileName);
    fs.closeSync(fd);
  });
  stream.end();
};

const pushFile = (stream, path, fileName) => {
  stream.pushStream({ ":path": path }, (err, pushStream) => {
    if (err) {
      throw err;
    }
    sendFile(pushStream, fileName);
  });
};

// handle requests
const http2Handlers = (req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    // push style.css
    pushFile(res.stream, "/style.css", "style.css");

    // push all files in scripts directory
    const files = fs.readdirSync(`${dirname}/scripts`);
    for (let i = 0; i < files.length; i++) {
      const fileName = `${dirname}/scripts/${files[i]}`;
      const path = `/scripts/${files[i]}`;
      pushFile(res.stream, path, fileName);
    }

    // push all files in images directory
    const imageFiles = fs.readdirSync(`${dirname}/images`);
    for (let i = 0; i < imageFiles.length; i++) {
      const fileName = `${dirname}/images/${imageFiles[i]}`;
      const path = `/images/${imageFiles[i]}`;
      pushFile(res.stream, path, fileName);
    }

    // lastly send index.html file
    sendFile(res.stream, "index.html");
  } else {
    // send empty response for favicon.ico
    if (req.url === "/favicon.ico") {
      res.stream.respond({ ":status": 200 });
      res.stream.end();
      return;
    }
    const fileName = path.join(dirname, req.url);
    sendFile(res.stream, fileName);
  }
};

http2
  .createSecureServer(serverOptions, http2Handlers)
  .listen(HTTP2_PORT, () => {
    console.log("http2 server started on port", HTTP2_PORT);
  });
