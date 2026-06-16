import mongoose from "mongoose";
import userService from "../services/user.service.js";

export const validId = (req, res, next) => {
    const { id } = req.params

    // Verifica se o ID fornecido é um ID de objeto MongoDB válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID inválido" })
    }

    next()
}

export const validUser = async (req, res, next) => {
    // Extrai o ID dos parâmetros da requisição
    const { id } = req.params

    try {
        // Chama o serviço para obter o usuário por ID
        const user = await userService.findByIdService(id)

        // Verifica se o usuário foi encontrado
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }
        
        req.user = user
        next()
    } catch (error) {        
        console.error("Erro ao buscar usuário por ID:", error);
        return res.status(500).json({ message: "Erro interno do servidor ao buscar usuário." });
    }
}
