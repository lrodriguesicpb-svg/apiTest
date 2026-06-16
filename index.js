import 'dotenv/config'
import express from 'express'
import userRoute from './src/routes/user.route.js'
import connectDB from './src/database/db.js'
import dotenv from 'dotenv'
dotenv.config()


// Cria uma instância do aplicativo Express
const app = express()

// Define a porta em que o servidor irá escutar
const port = process.env.PORT || 3000;

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

// Inicia o servidor e escuta na porta definida
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))