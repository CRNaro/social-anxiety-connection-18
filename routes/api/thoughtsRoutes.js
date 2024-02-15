const router = require('express').Router();


const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtsId/reactions
router
    .route('/:thoughtsId/reactions')
    .post(createReaction)
    .delete(deleteReaction);

// /api/thoughts/:thoughtsId/reactions/:reactionId
// router
//     .route('/:thoughtsId/reactions/:reactionId')
//     .delete(deleteReaction);
    
module.exports = router;