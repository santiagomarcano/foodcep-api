const router = require('express').Router();
const read = require('./restaurant_data_CRUD/read');
const update = require('./restaurant_data_CRUD/update');
const auth = require('../../../authentication/utils/auth');

router.use('/read', read);
router.use('/update', auth.chefPermission(), update);


module.exports = router;