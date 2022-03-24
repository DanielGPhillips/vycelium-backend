const router = require('express').Router();
const userRoutes = require('./userRoutes');
const sporeRoutes = require('./sporeRoutes');

router.use('/user', userRoutes);
router.use('/spores', sporeRoutes);