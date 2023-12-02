import jwt from "jsonwebtoken";
import { handleError } from "./error.js";


export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    
    if(!token) return next(handleError(401, "you are not allowed to access it!"))

    jwt.verify(token, process.env.jwt, (err, user)=>{
        if(err) return next(createError(403, "Token is invalid"));
        req.user = user;
        next();
    });
};