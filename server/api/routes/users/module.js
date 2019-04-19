const router = require('express').Router();
const profile = require('./profile');
const password = require('./modify/password');
const email = require('./modify/email');
const name = require('./modify/name');
const language = require('./modify/language');
const delete_user = require('./delete_user');
const team = require('./admin/team');
const invitation_links = require('./admin/invitation_links');

router.use('/', profile);
router.use('/password/', password);
router.use('/email', email);
router.use('/name', name);
router.use('/language', language);
router.use('/delete', delete_user);
router.use('/team', team);
router.use('/invite', invitation_links);

module.exports = router;