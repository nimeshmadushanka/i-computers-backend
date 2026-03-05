import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(

    {
       email : {
            type : String,
            required : true,
            unique : true,
            //email == string
       },
       firstName :{
            type : String,
            required : true,
        },
        lastName :{
            type : String,
            required : true,

        },
        password : {
            type : String,
            required : true
        },
        isAdmin : {
            type : Boolean,
           default : false,
           required : true

        },
        isBlocked : {
            type : Boolean,
            default: false,
            required : true,
        },
        isEmailVerified : {
            type : Boolean,
            required : true,
            default : true

        },
        Image :{
            type : String,
            default : "/images/default-profile.png"
        } 
        
    }
);

const User = mongoose.model("User",userSchema); 
export default User

