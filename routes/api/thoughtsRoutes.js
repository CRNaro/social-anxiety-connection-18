const router = require("express").Router({ mergeParams: true });

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

// Thoughts routes
router.route("/")
.get(getAllThoughts)
.post(createThought);

router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Reaction routes
router.route("/:thoughtId/reactions")
.post(createReaction);

router.route("/:thoughtId/reactions/:reactionId")
.delete(deleteReaction);

module.exports = router;
