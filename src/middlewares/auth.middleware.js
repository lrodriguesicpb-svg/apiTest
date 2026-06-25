import userService from '../services/user.service.js'

import dotenv from 'dotenv'
import jwa from 'jsonwebtoken'


// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

// Middleware para validar o token de acesso
export const authMiddleware = async (req, res, next) => {

    // Obtem o cabeçalho da requisição
    const { authorization } = req.headers

    // Verifica se a autorização está presente no cabeçalho da requisição
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' })
    }

    // Separa o esquema do token e o token em si
    const parts = authorization.split(" ")

    // Verifica se o esquema contém o valor "Bearer" e o token está presente
    if (parts.length !== 2) {
        return res.status(401).json({ message: 'Authorization inválido' })
    }

    // Verifica se o token e o Bearer estão preenchidos
    const [schema, token] = parts

    if (schema !== 'Bearer') {
        return res.status(401).json({ message: 'valor Bearer inválido' })
    } else if (!token) {
        return res.status(401).json({ message: 'Token inválido' })
    }

    // Verifica se o token é válido
    try {
        const decoded = jwa.verify(token, process.env.SECRET_JWT)

        // Busca o usuário no mongodb pelo ID do token
        const user = await userService.findByIdService(decoded.id)

        // Verifica se o usuário foi encontrado
        if (!user) {
            return res.status(401).json({ message: 'Usuário inválido' })
        }

        // Atribui o usuário ao objeto request
        req.userId = user._id

        return next()

    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' })
    }

}