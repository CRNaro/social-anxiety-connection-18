// Logic for routes related to the users
const User = require('../models/User');
const Thought = require('../models/Thoughts');

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
    const userData = await User.findOne({ _id: req.params.userId });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    } else {
    res.json(userData);
  } 
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
      { _id: req.params.userId },
      req.body,
      { new: true }
    );
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    } else {
    res.json(userData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
// deleteUser
exports.deleteUser = async (req, res) => {
  try {
    const userData = await User.findOneAndDelete({ _id: req.params.userId });

    // if user is found and deleted, also delete their thoughts
    if (userData) {
      if (userData.thoughts && userData.thoughts.length > 0) {   //!!!  JUST CHANGED THIS BEFORE LEAVING !!!!
      await Thought.deleteMany({ _id: { $in:userData.thoughts }  //thoughtsSchema.deleteMany({ username: userData .username });
      });
      }
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
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    );
    // Add userId to friendId's friend list
    const friendUpdate = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $addToSet: { friends: req.params.userId } },
      { new: true, runValidators: true }
    );
    if (!userUpdate || !friendUpdate) {
      res.status(404).json({ message: 'No user found with this id!' });
    } else {  // update the response to include the userUpdate and friendUpdate
      res.status(200).json({ message: 'Users are now friends!! :)', data: userUpdate, friendUpdate });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// deleteFriend
exports.deleteFriend = async (req, res) => {
  try {
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    // Remove friendId from userId's friend list
    const friendUpdate = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: req.params.userId } },
      { new: true, runValidators: true }
    );
    if (!userUpdate || !friendUpdate) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Users are no longer friends! :(', data: { userUpdate, friendUpdate } });
  } catch (err) {
    res.status(500).json(err);
  }
};
    
      

    // router.route('/')
    // .get(usersController.getUsers)
    // .post(usersController.createUser);

    // router.route('/:id')
    // .get(usersController.getUserById)
    // .put(usersController.updateUser)
    // .delete(usersController.deleteUser);