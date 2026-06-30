import { createClinicas, findAllClinicas, findByIdClinicas, updateClinicas, searchByName } from '../controllers/clinicas.controller.js'
import { validIdClinicas, validClinicas } from "../middlewares/global.middleware.js";
import { update } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import { Router } from "express";


// Cria uma instância do roteador do Express
const router = Router();

// post - rota para cadastrar uma nova clinica
router.post("/", authMiddleware, createClinicas)

// get - rota para buscar todas as clinicas
router.get("/", findAllClinicas)

// get - rota para buscar uma clínica por nome
router.get("/search", searchByName)

// get - rota para buscar uma clinica por ID
router.get("/:id", validIdClinicas, validClinicas, findByIdClinicas)

// patch - rota para atualizar uma clinica por ID
router.patch("/:id", validIdClinicas, validClinicas, updateClinicas)

export default router;