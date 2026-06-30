import Clinicas from "../models/Clinicas.js"

// Serviço para criar uma nova clinica
const createService = async (body) => Clinicas.create(body)

// Serviço para obter todas as clinicas
const findALLService = async (limit, offset) => Clinicas.find().limit(limit).skip(offset)

// Serviço para contar todas as clinicas
const countClinicasService = async () => Clinicas.countDocuments()

// Serviço para obter uma clinica por ID
const findByIdService = async (id) => Clinicas.findById(id)

// Serviço para atualizar uma clinica por ID com dados parciais
const updateService = async (id, updateData) => {
    return Clinicas.findOneAndUpdate({ _id: id }, updateData, { returnDocument: 'after' }); // { new: true } retorna o documento atualizado
}

// Serviço para buscar uma clinica por nome
const searchByNameService = async (name) => {
    return Clinicas.find({ name: { $regex: `${name || ""}`, $options: "i" } }).sort({ _id: -1 })


}

// Exporta os serviços para serem usados em outros arquivos
export default {
    createService,
    findALLService,
    findByIdService,
    updateService,
    countClinicasService,
    searchByNameService
}
