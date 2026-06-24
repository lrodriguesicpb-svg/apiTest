import express from 'express'
import connectDB from './src/database/db.js'
import dotenv from 'dotenv'

import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js'
import clinicasRoute from './src/routes/clinicas.route.js'


// Cria uma instâcia do aplicativo dotenv
dotenv.config()


// Cria uma instância do aplicativo Express
const app = express()

// Define a porta em que o servidor irá escutar
const port = process.env.port || 3000;

try {
    // Conecta ao banco de dados Teste
    await connectDB.connectDB()
} catch (error) {
    console.log(error)
}

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json())

// Define as rotas para os usuários
app.use("/users", userRoute);

// Define as rotas para validação de usuário
app.use("/auth", authRoute);

// Define as rotas para clinicas
app.use("/clinicas", clinicasRoute);

// Inicia o servidor e escuta na porta definida
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))