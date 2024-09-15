import express from "express";
import createSession from "../auth/createSession.js";
import logout from "../auth/blockListing.js";
import varify from '../auth/jwtAuthentication.js';

import userRouter from './UserRouter/userRouter.js';
import productRouter from './ProductRouter/Product.js';

const router = express.Router();
// User Router
router.use('/api/user',userRouter);
router.post('/api/auth/token',createSession.createToken);
router.get('/api/auth/logout',varify,logout);

// Product Router
router.use('/api/product',productRouter);

export default router;