import {Schema,model,models} from "mongoose";


const userSchema = new Schema({
    user:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


export const User  =  models.User || model("User",userSchema);

