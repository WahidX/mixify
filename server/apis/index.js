const router = require('express').Router();

router.get('/', function (req, res) {
  return res.status(200).json({
    message: 'API running fine',
  });
});

router.use('/v1', require('./v1'));

module.exports = router;
