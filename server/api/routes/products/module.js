const router = require('express').Router();
const create_product = require('./products_CRUD/create');
const read_product = require('./products_CRUD/read');
const read_for_pdf = require('./products_CRUD/read_for_pdf');
const update_product = require('./products_CRUD/update');
const delete_product = require('./products_CRUD/delete');
const create_category = require('./categories_CRUD/create');
const read_category = require('./categories_CRUD/read');
const update_category = require('./categories_CRUD/update');
const delete_category = require('./categories_CRUD/delete');

router.use('/create', create_product);
router.use('/read/', read_product);
router.use('/update', update_product);
router.use('/delete', delete_product);
router.use('/pdf', read_for_pdf);
router.use('/categories/create/', create_category);
router.use('/categories/read/', read_category);
router.use('/categories/update/', update_category);
router.use('/categories/delete/', delete_category);

module.exports = router;