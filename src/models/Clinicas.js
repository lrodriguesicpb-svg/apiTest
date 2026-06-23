import mongoose, { STATES } from "mongoose";

// Schema do Clinicas
const clinicasSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    email: { type: String, required: true },
    clinicType: { type: String, required: true },
    clinicStatus: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})

// Cria o modelo Clinicas a partir do esquema definido
const clinicasModel = mongoose.model("Clinicas", clinicasSchema);

// Exporta o modelo Clinicas para ser usado em outros arquivos
export default clinicasModel; 