import GeneroRepository from "../repositories/GeneroRepository.js";

const GeneroController = {

    async getAll(req, res) {
        try {
            const generos = await GeneroRepository.findAll();
            res.json(generos);
        } catch (err) {
            res.status(500).json({ error: "Erro na busca de gêneros", err });
        }
    },

    async create(req, res) {
        const { nome } = req.body;
        try {
            const novoGenero = { nome };
            const generoCriado = await GeneroRepository.createGenero(novoGenero);
            res.status(201).json(generoCriado);
        } catch (err) {
            res.status(500).json({ error: "Erro na criação do gênero", err });
        }
    },

    async getById(req, res) {
        const { id } = req.params;
        try {
            const genero = await GeneroRepository.findById(id);
            if (genero) {
                res.json(genero);
            } else {
                res.status(404).json({ error: "Gênero não encontrado" });
            }
        } catch (err) {
            res.status(500).json({ error: "Erro na busca do gênero", err });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { nome } = req.body;
        try {
            const generoExistente = await GeneroRepository.findById(id);
            if (!generoExistente) {
                return res.status(404).json({ error: "Gênero não encontrado" });
            }

            const generoAtualizado = await GeneroRepository.updateGenero(id, { nome });
            res.json(generoAtualizado);
        } catch (err) {
            res.status(500).json({ error: "Erro na atualização do gênero", err });
        }
    },

    async destroy(req, res) {
        const { id } = req.params;
        try {
            const generoExistente = await GeneroRepository.findById(id);
            if (!generoExistente) {
                return res.status(404).json({ error: "Gênero não encontrado" });
            }

            await GeneroRepository.deleteGenero(id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: "Erro na exclusão do gênero", err });
        }
    }
};

export default GeneroController;
