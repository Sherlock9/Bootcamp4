// @flow
import http from 'http';
import fs from 'fs';
import {join} from 'path';

let productsData = [
  {id: 1, name: 'apple', price: 6000},
  {id: 2, name: 'orange', price: 4000},
  {id: 3, name: 'watermelon', price: 20000},
  {id: 4, name: 'banana', price: 3000},
  {id: 5, name: 'melon', price: 18000},
];

// let filePath = join(__dirname, '../assets/images/heisenberg.png');
// let imageData = fs.readFileSync(filePath);
let indexPath = join(__dirname, '../assets/index.html');
let htmlData = fs.readFileSync(indexPath);

let server = http.createServer();

function ServerErrorPage(request, response) {
  response.writeHead(400, 'Content-Type', 'text/html');
  response.end('<p>404: Nothing here. Try something else.</p>');
}

function handleUpload(request, response) {
  // console.log(request);
  // let receivedUploadData = fs.createWriteStream('assets/uploadedData.txt');
  // request.pipe(receivedUploadData);
  // request.on('end', () => {
  //   receivedUploadData.end();
  //   response.end();
  // });
  console.log('HANDLING UPLOAD');
  console.log(request.method);
  console.log(request.headers);
  request.on('data', (data) => {
    console.log(data);
    console.log(JSON.parse(data));
  });
  request.on('end', () => {
    response.end();
  });
}

server.on('error', (e) => {
  console.log('Huge error:', e.message);
});

server.on('request', (request, response) => {
  console.log('We have received a request', request.url);
  if (request.url === '/') {
    request.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.write(htmlData);
    response.end();
    // } else if (request.url === '/api/products') {
    //   response.statusCode = 200;
    //   response.setHeader('Content-Type', 'application/json');
    //   response.write(JSON.stringify(productsData, null, 1));
    //   response.end();
    // } else if (request.url === '/image/example') {
    //   response.statusCode = 200;
    //   response.setHeader('Content-Type', 'image/png');
    //   response.write(imageData);
    //   response.end();
  } else if (request.url === '/submit-json') {
    console.log('JSON SUBMITTED');
    handleUpload(request, response);
  } else {
    ServerErrorPage(request, response);
  }
});

server.listen(8000, () => {
  console.log('Listening has begun.');
});
