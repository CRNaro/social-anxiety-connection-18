//const express = require('express');
//const router = express.Router();
//const { Reaction, Thought } = require('../../models/Reaction');
const router = require('express').Router();

// Create a new Reaction
// GET all Reactions
// GET a single Reaction by its _id
// PUT to update a Reaction by its _id
// DELETE to remove a Reaction by its _id
const {
    getReactions,
    getReactionById,
    createReaction,
    updateReaction,
    deleteReaction
} = require('../../controllers/thoughtsController'); //i think this is connected to my thoughtsController.js

// /api/reactions
router
    .route('/')
    .get(getReactions)
    .post(createReaction);

// /api/reactions/:id
router
    .route('/:id')
    .get(getReactionById)
    .put(updateReaction)
    .delete(deleteReaction);


module.exports = router;