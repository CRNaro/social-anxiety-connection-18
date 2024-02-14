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
    const userData = await User.findOne({ _id: req.params.id });
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
      { _id: req.params.id },
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
        const userData = await User.findOneAndDelete({ _id: req.params.id });
        res.json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
    };

    router.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser);

    router.route('/:id')
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);