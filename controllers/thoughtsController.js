// Logic for routes related to the thoughts

const { Thought, User } = require('../models');

//get all thoughts
exports.getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(400).json(err);
    }
};
//get thought by id
exports.getThoughtById = async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.id });
        res.json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
};
//create thought
exports.createThought = async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body);
        res.json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
};
//update thought
exports.updateThought = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id},
            req.body,
            { new: true }
        );
        res.json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
};
//delete thought
exports.deleteThought = async (req, res) => {
    try{
        const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
        res.json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
};
// get all reactions
exports.getReactions = async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
        res.json(thoughtData.reactions);
    } catch (err) {
        res.status(400).json(err);
    }
};
// get reaction by id
exports.getReactionById = async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
        const reaction = thoughtData.reactions.filter(
            (reaction) => reaction.reactionId === req.params.reactionId
        );
        res.json(reaction);
    } catch (err) {
        res.status(400).json(err);
    }
};

//add reaction
exports.createReaction = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        res.json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
};
//update reaction
exports.updateReaction = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { 'reactions.$[reaction]': req.body } },
            { arrayFilters: [{ 'reaction.reactionId': req.params.reactionId }], new: true }
        );
        res.json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
};

//delete reaction
exports.deleteReaction = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        res.json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
};

// router.route('/')
//     .get(thoughtsController.getAllThoughts)
//     .post(thoughtsController.createThought);

// router.route('/:id')    
//     .get(thoughtsController.getThoughtById)
//     .put(thoughtsController.updateThought)
//     .delete(thoughtsController.deleteThought);

// router.route('/:thoughtId/reactions')   
//     .post(thoughtsController.addReaction)
//     .delete(thoughtsController.deleteReaction);