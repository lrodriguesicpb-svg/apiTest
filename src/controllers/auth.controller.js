import bcrypt from 'bcrypt'
import { loginService, generateToken } from '../services/auth.service.js'

// loginController - controlador que recebe requisições de login
const login = async (req, res) => {
    const { username, password } = req.body

    try {
        // Verifica se o usuário existe e se a senha está correta
        const user = await loginService(username)

        // Verifica se o usuário existe e se a senha está correta
        if (!user) return res.status(404).json({ message: 'Usuário ou Senha Inválida!' })

        // Verifica se a senha está correta
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) return res.status(404).json({ message: 'Usuário ou Senha Inválida!' })

        // Converte documento Mongoose para objeto JS puro se necessário, evitando quebras
        const userObj = user.toObject ? user.toObject() : user

        // Gera o token de acesso
        const token = generateToken(userObj._id)

        // Retorna o objeto do usuário com senha oculta e o token
        res.status(200).json({ user: userObj, token })
    } catch (error) {

        // Retorna erro se ocorrer algum erro
        console.error('Erro no login:', error)

        // Retorna erro se ocorrer algum erro
        res.status(500).send({ message: error.message })
    }
}

export { login }