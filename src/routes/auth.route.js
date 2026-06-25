import { login } from '../controllers/auth.controller.js';

import { Router } from "express";

// authRoute - rota que recebe requisições de login
const router = Router();

// post - rota que recebe requisições de login
router.post("/", login)

export default router;