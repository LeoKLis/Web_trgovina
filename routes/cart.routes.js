const express = require('express');
const router = express.Router();
const data = require('../data/data');

router.get('/', (req, res) => {
    if(!req.session.activeCategory) { req.session.activeCategory = 0; }
    res.render("cart", {
        data: data, 
        cartTotal: req.session.cartTotal,
        activeCategoryId: req.session.activeCategory
    });
})

router.get('/getAll', (req, res) => {
    if(!req.session.cart) { req.session.cart = {}; }
    let products = {};
    for(const [key, value] of Object.entries(req.session.cart)){
        let [productIndex, categoryIndex] = key.split('_');
        let productName = data.categories[categoryIndex].products[productIndex].name;
        products[key] = {name: productName, quantity: value};
    }
    res.json({
        products: products,
        cartTotal: req.session.cartTotal
    });
});

router.get('/add/:id', (req, res) => {
    let { cart } = req.session;
    const { id } = req.params;
    if(cart) {
        if(id in cart){
            cart[id] += 1;
        }
        else{
            cart[id] = 1;
        }
        req.session.cartTotal += 1;
    }
    else {
        req.session.cart = {};
        req.session.cart[id] = 1;
        req.session.cartTotal = 1;
    }
    res.json({productTotal: req.session.cart[id], cartTotal: req.session.cartTotal});
});

router.get('/remove/:id', (req, res) => {
    // Session manager
    let { cart } = req.session;
    const { id } = req.params;
    if(cart) {
        if(id in cart) {
            req.session.cart[id] -= 1;
            req.session.cartTotal -= 1;
            if(req.session.cart[id] == 0){
                delete req.session.cart[id];
                res.json({productTotal: 0, cartTotal: req.session.cartTotal});
            }
            else {
                res.json({productTotal: req.session.cart[id], cartTotal: req.session.cartTotal});
            }
        }
    }
    else {
        req.session.cart = {};
    }
});

module.exports = router;