// Logic for routes related to the users
const User = require('../models/User');

// get all users
exports.getUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};
// getUserById
exports.getUserById = async (req, res) => {
  try {
    const userData = await User.findOne({ id: req.params.id });
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};
// createUser
exports.createUser = async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};
// updateUser
exports.updateUser = async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};
// deleteUser
exports.deleteUser = async (req, res) => {
    try {
        const userData = await User.findOneAndDelete({ id: req.params.id });

        // if user is found and deleted, also delete their thoughts
        if (userData) {
          await thoughtsSchema.deleteMany({ username: userData.username });
          res.status(200).json({ message: 'User was deleted successfully', deletedUser: userData});
        }else {
            res.status(404).json({ message: 'No user found with this id!' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
    };

    // addFriend
    exports.addFriend = async (req, res) => {
        try {
          const userData = await User.findOneAndUpdate(
            { id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
          );
          res.json(userData);
        } catch (err) {
          res.status(400).json(err);
        }
      };
      // deleteFriend
      exports.deleteFriend = async (req, res) => {
        try {
          const userData = await User.findOneAndUpdate(
            { id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
          );
          res.json(userData);
        } catch (err) {
          res.status(400).json(err);
        }
      };

    // router.route('/')
    // .get(usersController.getUsers)
    // .post(usersController.createUser);

    // router.route('/:id')
    // .get(usersController.getUserById)
    // .put(usersController.updateUser)
    // .delete(usersController.deleteUser);