// NOTE for future projects: when defining routes, maybe define in controller or in routes first and then
// at the top of corresponding file, make a note stating the routes that were defined
// ex: getUsers in userRoutes.js needs to be defined the exact same way in usersController.js, so just make 
// a note at the top of the file stating that the route was defined in the corresponding controller file

const router = require('express').Router();
const thoughtsRouter = require('./thoughtsRoutes');
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/usersController');


// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

 // /api/users/:userId/friends/:friendId
 router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);   

// /api/users/:userId/thoughts
router.use('/:userId/thoughts', thoughtsRouter);

module.exports = router;