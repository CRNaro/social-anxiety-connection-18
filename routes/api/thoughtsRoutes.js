const router = require('express').Router();
const {
    getThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(createThoughts);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// /api/thoughts/:thoughtsId/reactions
router
    .route('/:thoughtsId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtsId/reactions/:reactionId
router
    .route('/:thoughtsId/reactions/:reactionId')
    .delete(deleteReaction);
    
module.exports = router;