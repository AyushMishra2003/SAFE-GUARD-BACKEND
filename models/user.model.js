import { model, Schema } from "mongoose";


const userSchema=new Schema(
    {
         
        fullName:{
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        gender:{
            type: String,
            enum:["male","female","other"]
        }

    },
    {
        timestamps: true,
      
    }
)


const User=model("Safe-Gurad-User",userSchema)

export default User