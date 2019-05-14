const router = require('express').Router();
const profile = require('./profile');
const password = require('./update/password');
const email = require('./update/email');
const name = require('./update/name');
const language = require('./update/language');
const delete_user = require('./delete_user');
const team = require('./admin/team');
const invitation_links = require('./admin/invitation_links');
const stats = require('./admin/stats');
const currency = require('./update/currency');
const auth = require('../../../authentication/utils/auth')

router.use('/', profile);
router.use('/password/', password);
router.use('/email', email);
router.use('/name', name);
router.use('/language', language);
router.use('/delete', delete_user);
router.use('/team', auth.chefPermission(), team);
router.use('/invite', auth.chefPermission(), invitation_links);
router.use('/currency', currency);
router.use('/stats', stats);

module.exports = router;