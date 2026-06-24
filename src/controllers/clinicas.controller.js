import clinicasService from "../services/clinicas.service.js"


// Controller para a criar uma nova clinica
const createClinicas = async (req, res) => {
    try {

        // Extrai os dados do corpo da requisição
        const {
            name,
            phone,
            address,
            state,
            email,
            clinicType,
            clinicStatus,
            description } = req.body

        // Verifica se todos os campos são fornecidos
        if (!name || !phone || !address || !state || !email || !clinicType) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" })
        }

        try {
            const clinica = await clinicasService.create(req.body)

            // Verifica se a clinica foi criada com sucesso
            if (!clinica) {
                return res.status(400).json({
                    message: "Erro ao criar clinica"
                })
            }

            // Retorna uma resposta de sucesso com os detalhes da clinica criada
            res.status(201).json({
                message: "Clinica criada com sucesso",
                clinica: {
                    id: clinica._id,
                    name: clinica.name,
                    phone: clinica.phone,
                    address: clinica.address,
                    state: clinica.state,
                    email: clinica.email,
                    clinicType: clinica.clinicType,
                    isAciveClinica: clinica.isAciveClinica,
                }
            })

        } catch (error) {
            console.error("Erro ao criar clinica:", error);
            if (error.code === 11000) { // Erro de chave duplicada do MongoDB
                return res.status(409).json({ message: "Nome de clinica ou email já existe." });
            }
            return res.status(500).json({ message: "Erro interno do servidor ao criar clinica." });
        }

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Controller para buscar todas as clinicas
const findAllClinicas = async (req, res) => {
    try {
        const clinicas = await clinicasService.findALLService()

        // Verifica se a lista de clínicas está vazia
        if (!clinicas || clinicas.length === 0) {
            return res.status(404).json({ message: "Nenhuma clínica foi encontrada" })
        }

        // Retorna uma resposta de sucesso com a lista de clinicas
        return res.status(200).json({ clinicas })

    } catch (error) {
        console.error("Erro ao buscar clinicas:", error)
        return res.status(500).json({ message: "Erro interno do servidor ao buscar clinicas." })
    }
}

// Controller para buscar uma clinica por ID
const findByIdClinicas = async (req, res) => {

    try {

        // O ID já está disponível em req.params
        const { _id, name, phone, address, state, email, clinicType } = req.clinicas

        // Verifica se a clinica existe
        if (!req.clinicas) {
            return res.status(404).json({ message: "Nenhuma clinica foi encontrada" })
        }
        res.status(200).json({
            clinica: {
                id: _id,
                name,
                phone,
                address,
                state,
                email,
                clinicType
            }
        })

    } catch (error) {
        console.error("Erro ao buscar clinicas por ID:", error)
        return res.status(500).json({ message: "Erro interno do servidor ao buscar clinicas por ID." })

    }
}

const updateClinicas = async (req, res) => {
    // Extrai os dados do corpo da requisição
    const updateData = req.body;

    // Verifica se pelo menos um campo foi fornecido para atualização
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "Envie pelo menos um campo para atualização" })
    }

    // O ID já está disponível em req.user ou req.params
    const id = req.clinicas._id;

    try {
        // Não precisamos buscar o usuário aqui, o middleware validUser já garantiu que ele existe
        await clinicasService.updateService(id, updateData)
        res.json({ message: "Clinica atualizada com sucesso" })
    } catch (error) {
        console.error("Erro ao atualizar clinica:", error);
        if (error.code === 11000) { // Erro de chave duplicada do MongoDB
            return res.status(409).json({ message: "Nome de clinica ou email já existe." });
        }
        return res.status(500).json({ message: "Erro interno do servidor ao atualizar clinica." });
    }
}

export {
    createClinicas,
    findAllClinicas,
    findByIdClinicas,
    updateClinicas
}