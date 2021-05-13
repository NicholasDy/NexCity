const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const projectRoutes = require('./projectRoutes');
const destinationRoutes = require('./search-api-routes');

router.use('/users', userRoutes);
// router.use('/projects', projectRoutes);
router.use('/destination', destinationRoutes)

module.exports = router;
