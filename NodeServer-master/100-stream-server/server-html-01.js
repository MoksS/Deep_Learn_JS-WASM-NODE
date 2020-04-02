const http = require('http');
const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, './static/index.html'), (err, html) => {
  http.createServer((request, response) => response.end(html)).listen(3000);
});

// Переходим по http://localhost:8000/video/bridge.mp4 - видим ту же html
// идем к 02
