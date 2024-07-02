const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');
const authMiddleware = require('../../common/middleware/authMiddleware');

router.post('/discussions', authMiddleware, discussionController.createDiscussion);
router.put('/discussions/:id', authMiddleware, discussionController.updateDiscussion);
router.delete('/discussions/:id', authMiddleware, discussionController.deleteDiscussion);
router.get('/discussions/hashtag', authMiddleware, discussionController.listDiscussionsByHashtag);
router.get('/discussions/text', authMiddleware, discussionController.listDiscussionsByText);

module.exports = router;
