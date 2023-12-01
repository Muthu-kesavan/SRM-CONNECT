import express from "express";

const router = express.Router();

router.get('/', (req, res)=>{
    res.send("USER ROUTE")
});

export default router;