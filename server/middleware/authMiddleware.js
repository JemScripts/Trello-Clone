import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).send({ message : 'Access Denied. No token provided. '});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send({ message: 'Invalid or expired token. ' });
    }
};

export default verifyToken;