const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Running backend' });
});

module.exports = router;
