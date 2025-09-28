import express from 'express';
import { login, register, loginAdmin } from '../controllers/auth.js';

const router = express.Router();

// Client routes
router.post("/register", register);
router.post("/login", login);

// Admin route
router.post("/admin/login", loginAdmin);

export default router;
