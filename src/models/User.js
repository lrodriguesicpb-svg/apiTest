import mongoose from "mongoose";
import bcrypt from "bcrypt";


// Define o esquema do usuário usando Mongoose
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
    phone: { type: String },
    cpf: { type: String, unique: true },
    street: { type: String },
    number: { type: String },
    complement: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },


})

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
})

// Cria o modelo do usuário a partir do esquema definido
const User = mongoose.model("User", userSchema);

// Exporta o modelo do usuário para ser usado em outros arquivos
export default User;
