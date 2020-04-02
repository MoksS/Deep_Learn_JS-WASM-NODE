const http = require('http');
const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, './static/index.html'), (err, html) => {
  http
    .createServer((request, response) => {
      if (request.url === '/') {
        response.end(html);
      } else if (request.url === '/video') {
        return streamVideo(request, response);
      } else {
        response.end();
      }
    })
    .listen(3000);
});

function streamVideo(request, response) {
  const videoPath = path.resolve(__dirname, './static/video/bridge.mp4');
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = request.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });

    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    response.writeHead(206, head);
    file.pipe(response);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    response.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(response);
  }
}

// https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6
