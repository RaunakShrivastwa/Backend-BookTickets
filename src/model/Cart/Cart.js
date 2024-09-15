import mongoose from "mongoose";

class CartModel {
    constructor() {
        this.cartSchema = new mongoose.Schema({
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }, { timestamps: true });

        this.cart = mongoose.model('Cart', this.cartSchema);
    }

    getModel() {
        return this.cart;
    }
}

export default new CartModel().getModel();