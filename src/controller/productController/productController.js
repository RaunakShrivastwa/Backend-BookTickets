import ProductSchema from '../../model/Product/Product.js';
import UserSchema from '../../model/User/User.js';

export default class productController {

    // Add Product
    addProduct = async (req, res) => {
        try {
            if (req.user.userRole != 'Seller' && req.user.userRole != 'Admin')
                return res.status(403).json({ message: 'Create Your Business Account!!!!' });
            const Product = await ProductSchema.findOne({ user: req.user._id, name: req.body.name });
            if (Product) {
                Product.quantity += 1;
                Product.save();
                return res.status(200).json({ Message: 'Product Added', Quantity: Product.quantity });
            }
            const user = await UserSchema.findById(req.user._id);
            const product = await ProductSchema.create({ ...req.body, user: req.user._id });
            user.myProducts.push(product);
            user.save();
            return res.status(201).json({ Message: `Product Created With ID ${Product._id}` });
        } catch (error) {
            return res.status(500).json({ Error: error.message })
        }
    }

    // getAll Product
    getAllProduct = async (req, res) => {
        try {
            const allProduct = await ProductSchema.find({});
            if (allProduct.length == 0)
                return res.status(200).json({ message: 'There is no Products' });
            return res.status(200).json(allProduct);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    //Get Single Product
    getSingleProduct = async (req, res) => {
        try {
            return res.status(200).json(await ProductSchema.findById(req.params.id));
        } catch (error) {
            return res.status(501).json({Message:`There is Error ${error}`})
        }
    }

    // Find Product by Name
    findProductByName = async (req, res) => {
        try {
            const product = await ProductSchema.find({ name: { $regex: req.body.name, $options: 'i' } });
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // Delete Product
    deleteProduct = async (req, res) => {
        try {
            const id = req.params.id;
            const product = await ProductSchema.findByIdAndDelete(id);
            const user = await UserSchema.findById(product.user);
            user.myProducts.pull(id);
            user.save();

            return res.status(200).json({ product, user });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // Update Product
    updateProduct = async (req, res) => {
        try {
            const updateProduct = await ProductSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            return res.status(200).json(updateProduct);
        } catch (error) {
            return res.status(505).json(error);
        }
    }
}