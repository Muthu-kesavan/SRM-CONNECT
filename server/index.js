import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from './routes/users.js';
import authRoutes from './routes/auths.js';
import postRoutes from './routes/posts.js';

const corsOptions = {
    origin:["https://srm-connect.netlify.app,",
    "https://srm-connect.netlify.app/",
    "https://srm-connect.netlify.app/signin/",
    "https://srm-connect.netlify.app/signup/",
    "https://srm-connect.netlify.app/explore/",
    "https://srm-connect.netlify.app/profile/:id"
]
  }

const app = express();
dotenv.config();


const connect =()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("Connected to Database")
    }).catch((err)=> {
        console.log("Error")
})
 };
 app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('https://dataflow-412p.onrender.com/users', userRoutes);
app.use('https://dataflow-412p.onrender.com/auth', authRoutes);
app.use('https://dataflow-412p.onrender.com/posts', postRoutes);
app.listen(8000, ()=>{
    connect();
    console.log("Listening to the port 8000");
});