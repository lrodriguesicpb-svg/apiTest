import User from "../models/User.js"

// Serviço para criar um novo usuário
const create = async (body) => User.create(body)

// Serviço para obter todos os usuários
const findALLService = async () => User.find()

// Serviço para obter um usuário por ID
const findByIdService = async (id) => User.findById(id)

// Serviço para atualizar um usuário por ID com dados parciais
const updateService = async (id, updateData) => {
    return User.findOneAndUpdate({ _id: id }, updateData, { returnDocument: 'after' }); // { new: true } retorna o documento atualizado
}

// Exporta os serviços para serem usados em outros arquivos
export default {
    create,
    findALLService,
    findByIdService,
    updateService
}