const router = require('express').Router({ mergeParams: true});

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
    //.route('/:userId/thoughts')
    .get(getAllThoughts) 
    .post(createThought)

// /api/thoughts/:id
router
    .route('/:thoughtId')
    //.route('/:userId/thoughts/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//api/thoughts/:thoughtsId/reactions
router
    .route('/:thoughtId/reactions')
    //.route('/:userId/thoughts/:thoughtsId/reactions')
    .post(createReaction)
  
// //api/thoughts/:thoughtsId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    //.route('/:userId/thoughts/:thoughtsId/reactions/:reactionId')
    .delete(deleteReaction);
    

module.exports = router;