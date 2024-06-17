const User = require('../models/User');
const jwt = require('jsonwebtoken');

const secret = 'your_jwt_secret';

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ error: 'Email already in use' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};
