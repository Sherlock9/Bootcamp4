// @flow
import express from 'express';
// import mongoose from 'mongoose';

// import mainRoute from './routes/mainRoute';
// import {PORT, CONNECTION_STRING} from './globals/config';

import {PORT} from './globals/config';

import bodyParser from 'body-parser';

let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// setting JSON spacing
app.set('json spaces', 2);

// mongoose.connect(CONNECTION_STRING);
//
// mongoose.Promise = global.Promise;

type Product = {
  id: string,
  name: string,
  description: string,
  price: number,
  imageId: string,
};

let products: Array<Product> = [
  {
    id: '1',
    name: 'whiteout',
    description: 'Whites out pen marks.',
    price: 32000,
    imageId: '',
  },
  {
    id: '2',
    name: 'pen (black)',
    description: 'Writes in black ink.',
    price: 5000,
    imageId: '',
  },
  {
    id: '3',
    name: 'pencil',
    description: 'Writes in graphite. No eraser.',
    price: 1600,
    imageId: '',
  },
  {
    id: '4',
    name: 'eraser',
    description: 'Erases pencil marks.',
    price: 8000,
    imageId: '',
  },
];

let nextId = products.length + 1;

// parse application/json
app.use(bodyParser.json());

app.get('/products', (req, res) => {
  res.status(200).json({
    status: 'OK',
    products: products,
  });
});

app.get('/products/:id', (req, res) => {
  let productId = req.params.id;
  let resProduct = null;

  for (let item of products) {
    if (item.id === productId) {
      resProduct = item;
    }
  }

  if (resProduct) {
    res.status(200).json({
      status: 'OK',
      products: resProduct,
    });
  } else {
    res.status(404).send('Product not found.');
  }
});

app.post('/products', (req, res) => {
  let newId = nextId.toString();
  nextId += 1;
  let {name, description, price, imageId} = req.body;
  products.push({id: newId, name, description, price, imageId});
  res.status(200).send('New product added.');
});

app.put('/products/:id', (req, res) => {
  let productId = req.params.id;
  let {name, description, price, imageId} = req.body;
  let modifiedProductIndex = -1;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      modifiedProductIndex = i;
    }
  }

  if (modifiedProductIndex > -1) {
    products[modifiedProductIndex] = {
      id: productId,
      name,
      description,
      price,
      imageId,
    };
    res.status(200).send('Product modified.');
  } else {
    res.status(404).send('Product not found.');
  }
});

app.delete('/products/:id', (req, res) => {
  let productId = req.params.id;
  let toBeDeleted = -1;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      toBeDeleted = i;
    }
  }

  if (toBeDeleted > -1) {
    products.splice(toBeDeleted, toBeDeleted);
    res.status(200).send('Product deleted.');
  } else {
    res.status(404).send('Product not found.');
  }
});

// main route handler
// app.get('/products', mainRoute);

// app.use('/', (req, res) => {
//   res.send('test');
// });

// app.use('/api/users', (req: Req, res: Res) => {
//   res.status(200).json({
//     status: 'OK',
//     users: [{id: 1, name: 'dommy', age: 25}],
//   });
// });

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
