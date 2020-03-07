const express = require('express');

const path = require('path');

const router = express.Router();

const imageController = require('../controllers/image');

router.post('/add-image', imageController )
