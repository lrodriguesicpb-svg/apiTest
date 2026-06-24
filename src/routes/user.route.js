import express from 'express'
import userController from '../controllers/user.controller.js'
import { validId, validUser } from '../middlewares/global.middleware.js'


// Cria uma instância do roteador do Express
const route = express.Router();

// Define as rotas para criar os usuários
route.post("/", userController.create)

// Rota para obter todos os usuários
route.get("/", userController.findALL)

// Rota para obter um usuário por ID
route.get("/:id", validId, validUser, userController.findById)

// Rota para atualizar um usuário por ID
route.patch("/:id", validId, validUser, userController.update)

// Exporta o roteador para ser usado em outros arquivos
export default route; 