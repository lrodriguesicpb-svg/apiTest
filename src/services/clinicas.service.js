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

// Serviço para excluir uma clinica por ID
const eraseClinicasService = async (id) => Clinicas.findOneAndDelete({ _id: id })

// Serviço para buscar uma clínica por nome e estado
const findByNameAndStateService = async (name, state) => {
    return Clinicas.findOne({ 
        name: { $regex: `^${name}$`, $options: "i" },
        state: { $regex: `^${state}$`, $options: "i" }
    })
}

// Serviço para excluir uma clínica por nome e estado
const eraseClinicasByNameAndStateService = async (name, state) => {
    return Clinicas.findOneAndDelete({ 
        name: { $regex: `^${name}$`, $options: "i" },
        state: { $regex: `^${state}$`, $options: "i" }
    })
}


// Exporta os serviços para serem usados em outros arquivos
export default {
    createService,
    findALLService,
    findByIdService,
    updateService,
    countClinicasService,
    searchByNameService,
    findByNameAndStateService,
    eraseClinicasService,
    eraseClinicasByNameAndStateService
}
