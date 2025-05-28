const jwt = require('jsonwebtoken');

const authMiddleware = (role) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).send('Access denied.');


        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).send('Invalid token.');
            if (user.role !== role) return res.status(403).send('Access denied for this role.');
            req.user = user;
            next();
        });
    };
};


module.exports = authMiddleware;