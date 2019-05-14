const router = require('express').Router();
const read_route = require('./recipes_CRUD/read');
const update_route = require('./recipes_CRUD/update');
const create_route = require('./recipes_CRUD/create');
const delete_route = require('./recipes_CRUD/delete');
const auth = require('../../../authentication/utils/auth')

router.use('/read', read_route);
router.use('/create', auth.permission(), create_route);
router.use('/update', auth.permission(), update_route);
router.use('/delete', auth.permission(), delete_route);


module.exports = router;