import JwtToken from 'jsonwebtoken';
import User from '../model/User/User.js';
import dotenv from 'dotenv';
dotenv.config();


class CreateSession {
    createToken = async (req, res) => {

        try {
            const user = await User.findOne({ userEmail: req.body.userEmail });

            if (!user || (user.userPassword != req.body.userPassword)) {
                return res.status(403).json({ Message: 'Invalide Information' })
            }
            const token = JwtToken.sign(user.toJSON(), 'ecomDev01@112', { expiresIn: 10000 });
            return res.status(200).json(token);
        }
        catch (err) {
            return res.json({ Error: err })

        }
    }
}

export default new CreateSession();