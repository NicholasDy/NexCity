const router = require('express').Router();
const userRoutes = require('./userRoutes');
const destinationRoutes = require('./search-api-routes');
const trips = require('./trips')

router.use('/users', userRoutes);
// router.use('/projects', projectRoutes);
router.use('/destination', destinationRoutes)
router.use('/trips', trips)

module.exports = router;
