const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
const authMiddleware = require('../../common/middleware/authMiddleware')

router.post('/comments',authMiddleware, interactionController.createComment);
router.put('/comments/:id',authMiddleware, interactionController.updateComment);
router.delete('/comments/:id', authMiddleware,interactionController.deleteComment);
router.post('/comments/:id/like',authMiddleware, interactionController.likeComment);
router.post('/comments/:id/reply',authMiddleware, interactionController.replyComment);
router.post('/views',authMiddleware, interactionController.viewDiscussion);

module.exports = router;
