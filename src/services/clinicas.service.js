import Clinicas from "../models/Clinicas.js"

// Serviço para criar uma nova clinica
const create = async (body) => Clinicas.create(body)

// Serviço para obter todas as clinicas
const findALLService = async () => Clinicas.find()

// Serviço para obter uma clinica por ID
const findByIdService = async (id) => Clinicas.findById(id)

// Serviço para atualizar uma clinica por ID com dados parciais
const updateService = async (id, updateData) => {
    return Clinicas.findOneAndUpdate({ _id: id }, updateData, { returnDocument: 'after' }); // { new: true } retorna o documento atualizado
}

// Exporta os serviços para serem usados em outros arquivos
export default {
    create,
    findALLService,
    findByIdService,
    updateService
}
