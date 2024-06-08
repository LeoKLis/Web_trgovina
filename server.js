const express = require('express');
const app = express();
const express_session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express_session({
    secret: 'tajnikljuc123',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

const indexRouter = require('./routes/home.routes');
const cartRouter = require('./routes/cart.routes');

app.get('/', (req, res, next) => {
    res.redirect('/home');
})

app.use('/home', indexRouter);
app.use('/cart', cartRouter);

app.listen(3000);