import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import redisClient from '../config/redis.config.js';

dotenv.config();

const logout = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const decoded = jwt.decode(token);
    const ex = decoded.exp - Math.floor(Date.now() / 1000);

    redisClient.set(token, ex, 'blacklisted', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
    });

    return res.status(200).json({ message: 'Successfully logged out' });
}
export default logout;
