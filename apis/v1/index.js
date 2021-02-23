const router = require('express').Router();
const authController = require('../../controllers/auth_controller');
const linkController = require('../../controllers/link_controller');
const playlistController = require('../../controllers/playlist_controller');
const mixController = require('../../controllers/mix_controller');

// router.get('/auth/redirect', authControllers.redirectCode); // will check the state of redirect url later
router.get('/login/:linkid', authController.login);
router.post('/create', linkController.createLink);
router.post('/join/:linkid', linkController.joinLink);
router.post('/playlist/submit', playlistController.getTracks);
router.get('/mix/refresh/:id', mixController.getUsers);

module.exports = router;
