import userService from "../services/user.service.js"

// Controlador para criar um novo usuário
export const create = async (req, res) => {

    // Extrai os dados do corpo da requisição
    const {
        name,
        email,
        username,
        password,
        role,
        isActive,
        phone,
        cpf,
        street,
        number,
        complement,
        city,
        state,
        zipCode } = req.body;

    // Verifica se todos os campos são fornecidos
    if (!name || !email || !username || !password) { // Simplifiquei a validação inicial para campos essenciais
        return res.status(400).json({ message: "Todos os campos são obrigatórios" })
    }

    try {
        const user = await userService.create(req.body)

        if (!user) {
            return res.status(400).json({
                message: "Erro ao criar usuário"
            })
        }

        // Retorna uma resposta de sucesso com os detalhes do usuário criado
        res.status(201).json({
            message: "Usuário criado com sucesso",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                isActive: user.isActive,
                phone: user.phone,
                cpf: user.cpf,
                street: user.street,
                number: user.number,
                complement: user.complement,
                city: user.city,
                state: user.state,
                zipCode: user.zipCode
            }
        })
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        if (error.code === 11000) { // Erro de chave duplicada do MongoDB
            return res.status(409).json({ message: "Nome de usuário ou email já existe." });
        }
        return res.status(500).json({ message: "Erro interno do servidor ao criar usuário." });
    }
}

// Controlador para obter todos os usuários
export const findALL = async (req, res) => {
    try {
        // Chama o serviço para obter todos os usuários
        const users = await userService.findALLService()

        // Verifica se a lista de usuários está vazia
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Nenhum usuário encontrado" })
        }
        // Retorna uma resposta de sucesso com a lista de usuários
        res.status(200).json({ users })
    } catch (error) {
        console.error("Erro ao buscar todos os usuários:", error);
        return res.status(500).json({ message: "Erro interno do servidor ao buscar usuários." });
    }
}

// Controlador para obter um usuário por ID
export const findById = async (req, res) => {
    try {
        // O usuário já foi buscado e validado pelo middleware validUser
        const { _id, name, email, username, role, isActive, phone, cpf, street, number, complement, city, state, zipCode } = req.user;
        
        res.status(200).json({ 
            user: {
                id: _id,
                name,
                email,
                username,
                role,
                isActive,
                phone,
                cpf,
                street,
                number,
                complement,
                city,
                state,
                zipCode
            }
        })
    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
}

export const update = async (req, res) => {
    // Extrai os dados do corpo da requisição
    const updateData = req.body;

    // Verifica se pelo menos um campo foi fornecido para atualização
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "Envie pelo menos um campo para atualização" })
    }

    // O ID já está disponível em req.user ou req.params
    const id = req.user._id;

    try {
        // Não precisamos buscar o usuário aqui, o middleware validUser já garantiu que ele existe
        await userService.updateService(id, updateData)
        res.json({ message: "Usuário atualizado com sucesso" })
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        if (error.code === 11000) { // Erro de chave duplicada do MongoDB
            return res.status(409).json({ message: "Nome de usuário ou email já existe." });
        }
        return res.status(500).json({ message: "Erro interno do servidor ao atualizar usuário." });
    }
}

// Exportação padrão para que o import no user.route.js funcione corretamente
export default { create, findALL, findById, update };
