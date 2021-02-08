const router = require('express').Router();
const authController = require('../../controllers/auth_controller');
const linkController = require('../../controllers/link_controller');

// router.get('/auth/redirect', authControllers.redirectCode); // will check the state of redirect url later
router.get('/login', authController.login);
router.post('/create', linkController.createLink);
router.post('/join/:linkid', linkController.joinLink);

module.exports = router;
