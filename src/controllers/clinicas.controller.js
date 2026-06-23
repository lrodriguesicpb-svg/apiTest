import { create, findAllClinicas } from "../services/clinicas.service.js"


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
        if (!name || !phone || !address || !state || !email || !clinicType || !clinicStatus) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" })
        }

        try {
            const clinica = await create(req.body)

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
                    clinicStatus: clinica.clinicStatus,
                    description: clinica.description
                }
            })

        } catch (error) {
            console.error("Erro ao criar clinica:", error);
            if (error.code === 11000) { // Erro de chave duplicada do MongoDB
                return res.status(409).json({ message: "Nome de clinica ou email já existe." });
            }
            return res.status(500).json({ message: "Erro interno do servidor ao criar clinica." });
        }

        //res.send(201)
        //res.status(201).json({ message: "Clinicas criadas com sucesso!" })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Controller para buscar todas as clinicas
const findAllClinicas = async (req, res) => {

    const clinicas = []
    res.send(clinicas)
    //res.status(200).json({ message: "Clinicas encontradas com sucesso!" })
}

export {
    createClinicas,
    findAllClinicas
}