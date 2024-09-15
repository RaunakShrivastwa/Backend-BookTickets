import mongoose from "mongoose";

class UserModel{
    constructor(){
        this.userSchema = new mongoose.Schema({
            name:{type:String,required:true},
            userEmail:{type:String,required:true,unique:true},
            userPassword:{type:String,required:true},
            userAddress:{type:String},
            mobileNumber:{type:Number,required:true},
            userProfile:{type:String,default:'abc.png'},
            userRole:{type:String,enum: ['Admin', 'Customer', 'Seller'],required:true},
            myProducts:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}],
            wistList:[{type:mongoose.Schema.Types.ObjectId,ref:'WhistList'}],
            userFeedback:[{type:mongoose.Schema.Types.ObjectId,ref:'Feedback'}]
        },{timestamps:true});
        this.User = mongoose.model('User',this.userSchema);
    }

    getModel(){
         return this.User;
    }
}

export default new UserModel().getModel();
