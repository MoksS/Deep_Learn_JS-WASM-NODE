const http2 = require('http2');
const server = http2.createServer();
server.on('stream', (stream, requestHeaders) => {
  console.log(requestHeaders, '\n', stream);
  stream.respond({ ':status': 200, 'content-type': 'text/plain' });
  stream.write('hello world');
  stream.write('hello епта');
  stream.end('\n яяяязь');
});
server.listen(8000);