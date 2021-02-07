const router = require('express').Router();
const authControllers = require('../../controllers/auth');

router.get('/', authControllers.getDetails);
router.get('/login', authControllers.login);
router.get('/auth/redirect', authControllers.redirectCode);

module.exports = router;
