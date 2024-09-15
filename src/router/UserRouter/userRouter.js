import express from 'express';
import userController from '../../controller/userController/userController.js';
import verifyToken from '../../auth/jwtAuthentication.js';

const { addUser, deleteUser, getAllUSer, getSingleUser, updateUser } = userController;

const router = express.Router();
router.get('/users', getAllUSer);
router.post('/user', addUser);
router.get('/user/:id', getSingleUser);

export default router;