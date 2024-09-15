import mongoose from "mongoose";

class ProductModel {
    constructor() {
        this.productSchema = new mongoose.Schema({
            name: { type: String, required: true },
            description: { type: String, required: true },
            Price: { type: Number, required: true },
            quantity: { type: Number, required: true ,default:1},
            address: {type: String,required: true},
            verified: {type: mongoose.Schema.Types.ObjectId,ref: 'Verfication'},
            user: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
            categories: {type: mongoose.Schema.Types.ObjectId,ref: 'Category'},
            feedback: [{type: mongoose.Schema.Types.ObjectId,ref: 'Feedback'}],
            image: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
            size: { type: String, enum: ['XXL', 'XL', 'L', 'M', 'S'] },
        }, { timestamps: true });

        this.product = mongoose.model('Product', this.productSchema);
    }
    getModel() {return this.product;}
}
export default new ProductModel().getModel();