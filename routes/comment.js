var express = require('express');
var router = express.Router();
const passport = require('passport');

let commentController = require('../controllers/commentController');


router.get('/',commentController.comments);
 
router.post('/', commentController.create_comment);
 
router.put('/', commentController.update_comment);
 
router.delete('/',commentController.delete_comment);


module.exports = router; 