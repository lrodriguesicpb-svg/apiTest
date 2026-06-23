import { Router } from "express";

// authRoute - rota que recebe requisições de login
const router = Router();

// login - função que recebe requisições de login
import { login } from '../controllers/auth.controller.js';

// post - rota que recebe requisições de login
router.post("/", login)

export default router;