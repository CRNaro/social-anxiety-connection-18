const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const userRoutes = require('./userRoutes');
const reaction = require('./reaction');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', userRoutes);
router.use('/reactions', reaction);

module.exports = router;