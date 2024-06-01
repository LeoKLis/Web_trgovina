const express = require('express');
const router = express.Router();

const data = require('../data/data');

router.get('/', (_req, res) => {
    
    res.render("index", data);
});

router.get('/getProducts/:id', (req, res) => {
    res.json(data.categories[req.params.id]);
})

module.exports = router;