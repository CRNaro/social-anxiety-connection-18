// Logic for routes related to the thoughts
const { Thoughts, User } = require('../models');
const { db } = require('../models/Thoughts');
const { addReaction } = require('./usersController');

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
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
        }
        res.json(dbThoughtData);
    })
     .catch ((err) => {
        console.log(err);
        res.status(400).json(err);
    });
},
//create thought
createThought: async (req, res) => {
    Thoughts.create({ 
        userId: req.body.userId, 
        username: req.body.username, 
        thoughtText: req.body.thoughtText })
    .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => res.json(err));
},

//update thought
updateThought(req, res) {
   Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true,
            new: true})
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thoughtData);
             }) 
             .catch (err =>  res.status(500).json(err));
},
//delete thought
deleteThought(req, res) {
    console.log(`deleteThought function called ${req.params.thoughtId}`);
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this ID' });
                
            }
            return User.findOneAndUpdate(
                { _id: deletedThought.userId },
                { $pull: { thoughts: deletedThought._id } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
               return res.status(404).json({ message: 'No thought found with this id!' });
            }
        res.json({ message: 'Thought and associated references deleted!' });
    })
        .catch((err) => res.status(500).json({ message: err.message }));
},

// get all reactions
// getReactions: async (req, res) => {
//     try {
//         const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
//         res.json(thoughtData.reactions);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// },
// // get reaction by id
// getReactionById: async (req, res) => {
//     try {
//         const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
//         const reaction = thoughtData.reactions.filter(
//             (reaction) => reaction.reactionId === req.params.reactionId
//         );
//         res.json(reaction);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// },

// //add reaction
// createReaction(req, res)  {
//     Thoughts.findOneAndUpdate(
//         { _id: req.params.thoughtId },
//         { $push: { reactions: req.body } },
//         { new: true, runValidators: true }
//     )
//     .then(dbThoughtData => {
//         if (!dbThoughtData) {
//             res.status(404).json({ message: 'No thought found with this id!' });
//             return;
//         }
//         res.json(dbThoughtData);
//     })
//     .catch(err => res.json(err));
// },
// //update reaction
// updateReaction: async (req, res) => {
//     try {
//         const reactionData = {
//             userId: req.body.userId,
//             username: req.body.username,
//             reactionBody: req.body.reactionBody
//         }
//         const thoughtData = await Thought.findOneAndUpdate(
//             { _id: req.params.thoughtId },
//             { $set: { 'reactions.$[reaction]': req.body } },
//             { arrayFilters: [{ 'reaction.reactionId': req.params.reactionId }], new: true }
//         );
//         res.json(thoughtData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// },

// //delete reaction
// deleteReaction: async (req, res) => {
//     try {
//         const thoughtData = await Thought.findOneAndUpdate(
//             { _id: req.params.thoughtId },
//             { $pull: { reactions: { reactionId: req.params.reactionId } } },
//             { new: true }
//         );
//         res.json(thoughtData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// }
 };


module.exports = thoughtsController;

// Use the createThought method in a route

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

    //      const thoughtData = await Thought.create(req.body);
    //         //{
    //     //     ...req.body,
    //     //     username: user.username
    //     // });

    //    await User.findByIdAndUpdate(
    //         req.body.userId,
    //         { $push: { thoughts: thoughtData._id } },
    //         { new: true }
    //     );



// my old createThought:

//try {
    //console.log('createThought function called'); // Log when the function is called
    //console.log('req.body:', req.body); // Log the request body to see what's being sent to Thought.create
//     const thoughtData = await Thought.create(req.body);
//     console.log('thoughtData:', thoughtData); // Log the thoughtData
//     if (!thoughtData) {
//         return res.status(400).json({ message: 'Failed to create thought' });
//     }
//     const user = await User.findOneAndUpdate(       //or is it  updateOne?
//         { _id: req.params.userId }, // was req.body.userId
//         { $push: { thoughts: thoughtData._id } },
//         { runValidators: true, new: true}
//     );
//     console.log('user:', user); // Log the result of the update operation
//     if (!user.n) {
//         return res.status(404).json({ message: 'No user found with this id!' });
//     }

//     res.json(thoughtData);
// } catch (err) {
//     res.status(400).json(err);
// }
// };