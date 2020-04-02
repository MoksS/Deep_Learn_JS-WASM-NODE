const http = require('http');
const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, './static/index.html'), (err, html) => {
  fs.readFile(
    path.resolve(__dirname, './static/video/bridge.mp4'),
    (err, video) => {
      http
        .createServer((request, response) => {
          if (request.url === '/') {
            response.end(html);
          } else if (request.url === '/video') {
            response.end(video);
          } else {
            response.end();
          }
        })
        .listen(3000);
    },
  );
});

// Видим, что навигация по видео не работает!
// идем к 03
