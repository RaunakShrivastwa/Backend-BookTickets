import express from "express";
import productController from "../../controller/productController/productController.js";
import passport from "passport";
import verifyToken from "../../auth/jwtAuthentication.js";

const router = express.Router();
const { addProduct,
    getSingleProduct,
    getAllProduct,
    findProductByName,
    updateProduct,
    deleteProduct } = new productController();

router.post('/addProduct', verifyToken, addProduct);
router.get('/getAllProduct', getAllProduct);
router.get('/findProductByName', findProductByName);
router.delete('/deleteProduct/:id', verifyToken, deleteProduct);
router.post('/updateProduct/:id', verifyToken, updateProduct);

export default router;