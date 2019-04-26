const router = require('express').Router();
const create_supplier = require('./suppliers_CRUD/create');
const read_supplier = require('./suppliers_CRUD/read');
const update_supplier = require('./suppliers_CRUD/update');
const delete_supplier = require('./suppliers_CRUD/delete');

router.use('/create', create_supplier);
router.use('/read', read_supplier);
router.use('/update', update_supplier);
router.use('/delete', delete_supplier);

module.exports = router;