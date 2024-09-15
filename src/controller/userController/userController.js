import User from '../../model/User/User.js';
import redisClient from '../../config/redis.config.js';


class userController {
    // Add user
    addUser = async (req, res) => {
        try {
            const user = await User.create(req.body);
            return res.status(201).json(user);
        } catch (err) {
            return res.status(500).json({ Error: err.message })
        }
    }

    // getAll User
    getAllUSer = async (req, res) => {
        try {

            // redisClient.setEx(name1,'shubham')
            const users = await User.find({});
            return res.status(200).json({ user: users })
        } catch (err) {
            return res.json({ Error: err })
        }
    }


    // delete
    deleteUser = (req, res) => {

    }


    // get Singal User
    getSingleUser = async (req, res) => {
        const cacheKey = `User:${req.params.id}`;
        try {
            const cachedData = await redisClient.get(cacheKey);

            // check user present in cached or not
            if (cachedData) {
                return res.json({ message: 'from redis cached', user: JSON.parse(cachedData) });
            }

            // If not in cache, retrieve data from MongoDB
            const data = await User.findById(req.params.id);
            if (!data) {
                return res.status(404).json({ message: `Data not found with ${req.params.id}` });
            }

            redisClient.set(cacheKey, JSON.stringify(data), {
                EX: 60,
            });
            return res.json(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    };


    // for the update user
    updateUser = (req, res) => {

    }
}

export default new userController();