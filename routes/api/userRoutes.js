const router = require('express').Router();
const {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getUsersById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;