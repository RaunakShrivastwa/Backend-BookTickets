import mongoose from "mongoose";

class CategoryModel {
    constructor() {
        this.categorySchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }, {
            timestamps: true
        })

        this.Category = mongoose.model('Category', this.categorySchema);
    }

    getModel() {
        return this.Category;
    }
}

export default new CategoryModel().getModel();