import mongoose, { STATES } from "mongoose";

// Schema do Clinicas
const clinicasSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    email: { type: String, required: true },
    clinicType: { type: String, required: true },
    isAciveClinica: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

// Cria índice para busca por nome e estado
clinicasSchema.index({ name: 1, state: 1 }, { unique: true })

// Cria o modelo Clinicas a partir do esquema definido
const clinicasModel = mongoose.model("Clinicas", clinicasSchema);

// Exporta o modelo Clinicas para ser usado em outros arquivos
export default clinicasModel; 