const express = require('express');
const app = express();
const path = require('path')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

const indexRouter = require('./routes/index.routes');
const cartRouter = require('./routes/cart.routes');

app.use('/home', indexRouter);
app.use('/cart', cartRouter);

app.listen(3000);