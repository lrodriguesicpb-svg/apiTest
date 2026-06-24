import { Router } from "express";
import { createClinicas, findAllClinicas, findByIdClinicas, updateClinicas } from '../controllers/clinicas.controller.js'
import { validIdClinicas, validClinicas } from "../middlewares/global.middleware.js";
import { update } from "../controllers/user.controller.js";

// Cria uma instância do roteador do Express
const router = Router();



// post - rota para cadastrar uma nova clinica
router.post("/", createClinicas)

// get - rota para buscar todas as clinicas
router.get("/", findAllClinicas)

// get - rota para buscar uma clinica por ID
router.get("/:id", validIdClinicas, validClinicas, findByIdClinicas)

// patch - rota para atualizar uma clinica por ID
router.patch("/:id", validIdClinicas, validClinicas, updateClinicas)



export default router;