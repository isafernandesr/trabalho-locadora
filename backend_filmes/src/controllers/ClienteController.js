import ClienteRepository from "../repositories/ClienteRepository.js";

const ClienteController = {

    async getAll(req, res) {
        try {
            const clientes = await ClienteRepository.findAll();
            res.json(clientes);
        } catch (err) {
            res.status(500).json({ error: "Erro na busca de clientes", err });
        }
    },

    async create(req, res) {

        const { nome, endereco, email, cpf } = req.body;
        try {
            const novoCliente = { nome, endereco, email, cpf };
            const clienteCriado = await ClienteRepository.createCliente(novoCliente);
            res.status(201).json(clienteCriado);
        } catch (err) {
            res.status(500).json({ error: "Erro na criação do cliente", err });
        }
    },

    async getById(req, res) {
        const { id } = req.params;
        try {
            const cliente = await ClienteRepository.findById(id);
            if (cliente) {
                res.json(cliente);
            } else {
                res.status(404).json({ error: "Cliente não encontrado" });
            }
        } catch (err) {
            res.status(500).json({ error: "Erro na busca do cliente", err });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { nome, endereco, email, cpf } = req.body;
        try {
            const clienteExistente = await ClienteRepository.findById(id);
            if (!clienteExistente) {
                return res.status(404).json({ error: "Cliente não encontrado" });
            }

            const clienteAtualizado = await ClienteRepository.updateCliente(id, { nome, endereco, email, cpf });
            res.json(clienteAtualizado);
        } catch (err) {
            res.status(500).json({ error: "Erro na atualização do cliente", err });
        }
    },

    async destroy(req, res) {
        const { id } = req.params;
        try {
            const clienteExistente = await ClienteRepository.findById(id);
            if (!clienteExistente) {
                return res.status(404).json({ error: "Cliente não encontrado" });
            }

            await ClienteRepository.deleteCliente(id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: "Erro na exclusão do cliente", err });
        }
    }
}

export default ClienteController;