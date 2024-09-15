import mongoose from "mongoose";

class OrderModel{
    constructor() {
        this.orderSchema = new mongoose.Schema({
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            amount: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                required: true,
                enum: ['Delivered','Canceled','Placed','On the way']
            }
        },{
            timestamps: true
        })

        this.Order = mongoose.model('Order',this.orderSchema);
    }

    getModel() {
        return this.Order;
    }
}

export default new OrderModel().getModel();