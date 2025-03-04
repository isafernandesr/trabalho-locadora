import LocacaoItemRepository from "../repositories/LocacaoItemRepository.js";

const LocacaoItemController = {

    async getAll(req, res) {
        try {
            const locacaoItem = await LocacaoItemRepository.findAll();
            res.json(locacaoItem);
        } catch (err) {
            res.status(500).json({ error: "Erro na busca de locações item", err });
        }
    },

    async create(req, res) {
        const { locacao_id, filme_id, preco } = req.body;
        try {
            const novaLocacaoItem = { locacao_id, filme_id, preco };
            const locacaoItemCriada = await LocacaoItemRepository.createLocacaoItem(novaLocacaoItem);
            res.status(201).json(locacaoItemCriada);
        } catch (err) {
            res.status(500).json({ error: "Erro na criação da locação item", err });
        }
    },

    async getById(req, res) {
        const { id } = req.params;
        try {
            const locacaoItem = await LocacaoItemRepository.findById(id);
            if (locacaoItem) {
                res.json(locacaoItem);
            } else {
                res.status(404).json({ error: "Locação item não encontrado" });
            }
        } catch (err) {
            res.status(500).json({ error: "Erro na busca do locação item", err });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { locacao_id, filme_id, preco } = req.body;
        try {
            const locacaoItemExistente = await LocacaoItemRepository.findById(id);
            if (locacaoItemExistente) {
                const locacaoItemAtualizado = { locacao_id, filme_id, preco };
                const updatedLocacaoItem = await LocacaoItemRepository.updateLocacaoItem(id, locacaoItemAtualizado);
                res.json(updatedLocacaoItem);
            } else {
                res.status(404).json({ error: "Locação item não encontrado para atualizar" });
            }
        } catch (err) {
            res.status(500).json({ error: "Erro ao atualizar locação item", err });
        }
    },

    async destroy(req, res) {
        const { id } = req.params;
        try {
            const locacaoItemExistente = await LocacaoItemRepository.findById(id);
            if (locacaoItemExistente) {
                await LocacaoItemRepository.deleteLocacaoItem(id);
                res.status(204).json();
            } else {
                res.status(404).json({ error: "Locação item não encontrado para deletar" });
            }
        } catch (err) {
            res.status(500).json({ error: "Erro ao deletar locação item", err });
        }
    }
}

export default LocacaoItemController;
