const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find({ user: req.userId });
        res.send(books);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

exports.addBook = async (req, res) => {
    try {
        const { title, author, status } = req.body;
        const book = new Book({ title, author, status, user: req.userId });
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};
