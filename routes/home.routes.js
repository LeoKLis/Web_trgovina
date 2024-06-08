const express = require('express');
const router = express.Router();
const data = require('../data/data');

router.get('/', (req, res) => {
    if(!req.session.cart) { req.session.cart = {}; }
    if(!req.session.cartTotal) { req.session.cartTotal = 0; }
    if(!req.session.activeCategory) { req.session.activeCategory = 0; }
    res.render("home", {
        data: data, 
        activeCategoryId: req.session.activeCategory,
        cart: req.session.cart,
        cartTotal: req.session.cartTotal
    });
});

router.get('/getCategories', (req, res) => {
    if(!req.session.activeCategory) { req.session.activeCategory = 0; }
    let categoriesArr = {};
    data.categories.forEach((value, index) => {
        categoriesArr[index] = value.name;
    });
    res.json({
        categories: categoriesArr,
        activeCategory: req.session.activeCategory
    })
});

router.get('/getProducts/:id', (req, res) => {
    if(!req.session.cart) { req.session.cart = {}; }
    if(!req.session.cartTotal) { req.session.cartTotal = 0; }
    req.session.activeCategory = req.params.id;
    res.json({
        data: data.categories[req.params.id],
        cart: req.session.cart
    });
});

module.exports = router;