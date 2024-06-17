const express = require('express');
const { getBooks, addBook } = require('../controllers/bookController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getBooks);
router.post('/', auth, addBook);

module.exports = router;
