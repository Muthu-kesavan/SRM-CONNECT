import express from "express";
import { signup, signin } from '../controllers/auth.js';
const router = express.Router();

router.post('https://dataflow-412p.onrender.com/signup', signup);
router.post('https://dataflow-412p.onrender.com/signin', signin);
export default router;