var express = require('express');
var router = express.Router();
const passport = require('passport');

let postController = require('../controllers/postController');
let commentController = require('../controllers/commentController');


router.get('/:id/comment/',commentController.comments);
 
router.post('/:id/comment/', commentController.create_comment);
 
router.put('/:id/comment/:comment_id', commentController.update_comment);
 
router.delete('/:id/comment/:comment_id',commentController.delete_comment);

router.get('/:id',postController.post);

router.get('/',postController.all_posts);


module.exports = router; 