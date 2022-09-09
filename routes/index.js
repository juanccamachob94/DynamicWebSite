const router = require('express').Router();
const IndexController = require('../controllers/index_controller');
router.route('/')
  .get(IndexController.index)
  ;
module.exports = router;
