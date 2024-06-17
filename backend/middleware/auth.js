const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = 'your_jwt_secret';

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findOne({ _id: decoded.userId });
        if (!user) {
            throw new Error();
        }
        req.userId = user._id;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

module.exports = auth;
