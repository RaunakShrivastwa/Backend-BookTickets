import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/User/User.js';
import redisClient from '../config/redis.config.js';

dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const redisData = await redisClient.get(token);
  if (redisData) return res.status(403).json({ Message: 'Session Closed, !!!! Create New Session' })
  try {
    const decoded = jwt.verify(token, 'ecomDev01@112');
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
