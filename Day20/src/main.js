// @flow
import http from 'http';
import fs from 'fs';
import {join} from 'path';

import Router from './Router';

const contentTypeList = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  html: 'text/html',
  txt: 'text/plain',
  mp4: 'video/mp4',
  mp3: 'audio/mp3',
};

let server = http.createServer();
let router = new Router();
let assetsPath = join(__dirname, '../assets/');

// let productsData = [
//   {id: 1, name: 'apple', price: 6000},
//   {id: 2, name: 'orange', price: 4000},
//   {id: 3, name: 'watermelon', price: 20000},
//   {id: 4, name: 'banana', price: 3000},
//   {id: 5, name: 'melon', price: 18000},
// ];
// let filePath = join(__dirname, '../assets/images/heisenberg.png');
// let imageData = fs.readFileSync(filePath);

function serveHomePage(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(join(assetsPath, 'index.html'), (err, htmlData) => {
    if (err) {
      serveNotFoundPage(request, response);
    }
    response.end(htmlData);
  });
}

function serveNotFoundPage(request, response) {
  response.writeHead(404, {'Content-Type': 'text/html'});
  response.end('<p>404: Nothing here. Try something else.</p>');
}

function serveFile(request, response, fileName) {
  let extension = fileName.split('.').pop();
  fs.readFile(join(assetsPath, fileName), (err, file) => {
    if (err) {
      serveNotFoundPage(request, response);
    }
    response.writeHead(200, {'Content-Type': contentTypeList[extension]});
    response.end(file);
  });
}

function handleUpload(request, response) {
  console.log(request);
  let receivedUploadData = fs.createWriteStream('assets/uploadedData.txt');
  request.pipe(receivedUploadData);
  request.on('end', () => {
    receivedUploadData.end();
    response.end();
  });
}

function handleUploadJson(request, response) {
  // console.log('HANDLING UPLOAD');
  // console.log(request.method);
  // console.log(request.headers);
  request.on('data', (data) => {
    // console.log(data);
    console.log(JSON.parse(data));
  });
  request.on('end', () => {
    response.end();
  });
}

server.on('error', (e) => {
  console.log('Huge error:', e.message);
});

router.addRoute('/', ({response, request}) => {
  serveHomePage(request, response);
});

router.addRoute('/files/', ({response, request}, fileName) => {
  serveFile(request, response, fileName);
});

router.addRoute('/upload', ({response, request}) => {
  handleUpload(request, response);
});

router.addRoute('/upload-json', ({response, request}) => {
  handleUploadJson(request, response);
});

server.on('request', (request, response) => {
  console.log(request.url);
  router.handleRequest(request.url, {request, response}, serveNotFoundPage);
});

server.listen(8080, () => {
  console.log('Listening has begun.');
});

// server.on('request', (request, response) => {
//   console.log('We have received a request', request.url);
//   if (request.url === '/') {
//     request.statusCode = 200;
//     response.setHeader('Content-Type', 'text/html');
//     response.write(htmlData);
//     response.end();
//   } else if (request.url === '/api/products') {
//     response.statusCode = 200;
//     response.setHeader('Content-Type', 'application/json');
//     response.write(JSON.stringify(productsData, null, 1));
//     response.end();
//   } else if (request.url === '/image/example') {
//     response.statusCode = 200;
//     response.setHeader('Content-Type', 'image/png');
//     response.write(imageData);
//     response.end();
//   } else if (request.url === '/submit-json') {
//     console.log('JSON SUBMITTED');
//     handleUpload(request, response);
//   } else {
//     serveNotFoundPage(request, response);
//   }
// });
