import mongoose from "mongoose";
import userService from "../services/user.service.js";
import clinicasService from "../services/clinicas.service.js";

// Middleware para validar se o ID do usuário é válido
export const validId = (req, res, next) => {
    const { id } = req.params

    // Verifica se o ID fornecido é um ID de objeto MongoDB válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID inválido" })
    }

    next()
}

// Middleware para validar se o usuário é válido
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

// Middleware para validar se o ID da clinica é válida
export const validIdClinicas = async (req, res, next) => {
    // Extrai o ID dos parâmetros da requisição
    const { id } = req.params

 if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID inválido" })
    }

    next()
}   

// Middleware para validar se a clinica é válida
export const validClinicas = async (req, res, next) => {
    // Extrai o ID dos parâmetros da requisição
    const { id } = req.params

    try {
        // Chama o serviço para obter a clinica por ID
        const clinica = await clinicasService.findByIdService(id)

        // Verifica se a clinica foi encontrada
        if (!clinica) {
            return res.status(404).json({ message: "Clinica não encontrada" })
        }

        req.clinicas = clinica
        next()
    } catch (error) {
        console.error("Erro ao buscar clinica por ID:", error);
        return res.status(500).json({ message: "Erro interno do servidor ao buscar clinica." });
    }
}