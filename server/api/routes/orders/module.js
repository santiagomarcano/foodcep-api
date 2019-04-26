const router = require('express').Router();
const create_order = require('./orders_CR/create');
const read_order = require('./orders_CR/read');

router.use('/create', create_order);
router.use('/read', read_order);

module.exports = router;