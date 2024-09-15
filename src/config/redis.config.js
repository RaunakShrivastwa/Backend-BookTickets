import 'dotenv/config';
import redis from 'redis';

const redisOptions = {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    retry_strategy: (times) => Math.min(times * 50, 2000),
};

const redisClient = redis.createClient(redisOptions);

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis connected successfully');
});

await redisClient.connect();

export default redisClient;
