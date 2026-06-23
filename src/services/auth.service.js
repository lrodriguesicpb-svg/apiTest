import User from "../models/User.js";
import jwt from 'jsonwebtoken'

// loginService - retorna uma promise que resolve com o objeto do usuário
const loginService = (username) => User.findOne({ username: username }).select('+password')

// generateToken - retorna uma promise que resolve com o token de acesso
const generateToken = (id) => jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 86400 })


export {
    loginService,
    generateToken
}