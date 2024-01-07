import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        email:{ 
            type: String,
            required: true,
            unique: true 
        },
        register_no:{
            type: String,
            required: true,
            unique: true
        },
     
        campus:{
            type: String,
            required: true
        },
        password:{ 
            type: String,
            required: true 
            },
        profileProfile:{
             type: String, 
            },
        followers:{ 
            type: Array,
            defaultValue: [] 
        },
        following:{ 
            type: Array, 
            defaultValue: [] 
        },
        description:{
            type: String,
        },
        profilePicture: {
            type: String,
            default: "https://firebasestorage.googleapis.com/v0/b/srm-connect-007.appspot.com/o/DefaultProfilePic.jpg?alt=media&token=27177761-1d4e-4490-9809-bcb5556c80d4",
        },
     },
        { 
            timestamps: true 
        }
);

export default mongoose.model("User", UserSchema);