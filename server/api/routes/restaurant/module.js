const router = require('express').Router();
const read = require('./restaurant_data_CRUD/read');
const update = require('./restaurant_data_CRUD/update');

router.use('/read', read);
router.use('/update', update);


module.exports = router;