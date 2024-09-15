import mongoose from "mongoose";

class WishlistModel {
    constructor() {
        this.wishlistSchema = new mongoose.Schema({
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        }, {
            timestamps: true
        })

        this.Wishlist = mongoose.model('Wishlist', this.wishlistSchema);
    }

    getModel() {
        return this.Wishlist;
    }
}

export default this.WishlistModel().getModel();