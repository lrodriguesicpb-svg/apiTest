import bcrypt from 'bcrypt'
import { loginService } from '../services/auth.service.js'

const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await loginService(username)

        if (!user) return res.status(404).json({ message: 'Usuário ou Senha Inválida!' })

        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) return res.status(404).json({ message: 'Usuário ou Senha Inválida!' })

        // Converte documento Mongoose para objeto JS puro se necessário, evitando quebras
        const userObj = user.toObject ? user.toObject() : user
        // delete userObj.password

        res.status(200).json({ user: userObj })
    } catch (error) {
        console.error('Erro no login:', error)
        res.status(500).send({ message: error.message })
    }
}

export { login }