const router = require('express').Router();
const create_dish = require('./dishes_CRUD/create');
const read_dish = require('./dishes_CRUD/read');
const patch_dish = require('./dishes_CRUD/update');
const delete_dish = require('./dishes_CRUD/delete');

router.use('/create', create_dish);
router.use('/read', read_dish);
router.use('/patch', patch_dish);
router.use('/delete', delete_dish);

module.exports = router;