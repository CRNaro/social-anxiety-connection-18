// NOTE:  !!!HAVE TO RUN node server.js in terminal so it starts 3001 AND 27017!!!
const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const userRoutes = require('./userRoutes');
//const reactionRoutes = require('./reactionRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', userRoutes);
//router.use('/reactions', reactionRoutes);

module.exports = router;