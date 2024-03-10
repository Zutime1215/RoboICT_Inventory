const express = require('express');
const morgan = require('morgan');
const server = express();
const productRouter = require('./routes/product')

//bodyParser
server.use(express.json());
// server.use(morgan('default'));
server.use(express.static('public'));
server.use('/products',productRouter.router);

server.listen(8080, () => {
  console.log('server started');
});
