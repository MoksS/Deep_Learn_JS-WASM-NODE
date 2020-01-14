const http2 = require('http2');
const client = http2.connect('http://localhost:8000');
const req = client.request({ ':method': 'GET', ':path': '/' });
const data = [];
req.on('response', (responseHeaders) => {
  // do something with the headers
});
req.on('data', (chunk) => {
  data.push(chunk);
});
req.on('end', () =>{
    console.log(data.toString('utf8'));
    client.destroy()});