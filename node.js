"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");

const STATIC_PATH = path.join(__dirname, "./public");

const MIME_TYPES = {
  html: "text/html; charset=UTF-8",
  js: "application/javascript; charset=UTF-8",
  css: "text/css",
  png: "image/png",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const serveFile = name => {
  const filePath = path.join(STATIC_PATH, name);
  if (!filePath.startsWith(STATIC_PATH)) {
    return null;
  }
  const stream = fs.createReadStream(filePath);
  stream.on("error",(e) => console.log(e));
  return stream;
};

const server = http.createServer((req, res) => {
  const { url } = req;
  const name = url === "/" ? "/index.html" : url;
  const fileExt = path.extname(name).substring(1);
  const mimeType = MIME_TYPES[fileExt] || MIME_TYPES.html;
  res.writeHead(200, { "Content-Type": mimeType, "Cache-Control" : "public, max-age=0" });
  const stream = serveFile(name);
  if (stream) stream.pipe(res);
}).listen(8000, (err) => {
    if(err) return console.log(err);
    console.log(`PURE NODEJS \nserver is listening on ${server.address().port}`);
});

