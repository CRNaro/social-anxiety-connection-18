// Logic for routes related to the thoughts
const { Thoughts, User } = require("../models");
const { db } = require("../models/Thoughts");
const { addReaction } = require("./usersController");

const thoughtsController = {
  //get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find()
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //get thought by id
  getThoughtById(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //create thought
  createThought: async (req, res) => {
    Thoughts.create({
      userId: req.body.userId,
      username: req.body.username,
      thoughtText: req.body.thoughtText,
    })
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //update thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
  //delete thought
  deleteThought(req, res) {
    console.log(`deleteThought function called ${req.params.thoughtId}`);
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this ID" });
        }
        return User.findOneAndUpdate(
          { _id: deletedThought.userId },
          { $pull: { thoughts: deletedThought._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json({ message: "Thought and associated references deleted!" });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  },

  //add reaction
  createReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.json(err);
      });
  },
  //delete reaction
  deleteReaction(req, res) {
    console.log(`deleteReaction function called ${req.params.thoughtId}`);
    console.log("Reaction ID: ", req.params.reactionId); // Log reactionId
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((dbUserData) => {
        console.log("dbUserData: ", dbUserData); // Log updated user data
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json({ message: "Thought and associated references deleted!" });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  },
};

module.exports = thoughtsController;
