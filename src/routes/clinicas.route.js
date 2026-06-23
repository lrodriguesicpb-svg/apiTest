import { Router } from "express";
const router = Router();

import { createClinicas, findAllClinicas } from '../controllers/clinicas.controller.js'

// post - rota para cadastrar uma nova clinica
router.post("/", createClinicas)

// get - rota para buscar todas as clinicas
router.get("/", findAllClinicas)



export default router;