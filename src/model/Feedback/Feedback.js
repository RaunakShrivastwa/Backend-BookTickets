import mongoose from "mongoose";

class FeedbackModel {
    constructor() {
        this.feedbackSchema = new mongoose.Schema({
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            message: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            image: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Image'
            }
        },{
            timestamps: true
        });

        this.Feedback = mongoose.model('Feedback', this.feedbackSchema);
    }

    getModel() {
        return this.Feedback;
    }
}

export default new FeedbackModel().getModel();