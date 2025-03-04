import LocacaoRepository from "../repositories/LocacaoRepository.js";

const LocacaoController = {

    async getAll(req, res) {
        try {
            const locacoes = await LocacaoRepository.findAll();
            res.json(locacoes);
        } catch (err) {
            res.status(500).json({ error: "Erro na busca de locações", err });
        }
    },

    async create(req, res) {
        const { data_inicio, data_final, cliente_id } = req.body;
        try {
            const novaLocacao = { data_inicio, data_final, cliente_id };
            const locacaoCriada = await LocacaoRepository.createLocacao(novaLocacao);
            res.status(201).json(locacaoCriada);
        } catch (err) {
            res.status(500).json({ error: "Erro na criação da locação", err });
        }
    },

    async getById(req, res) {
        const { id } = req.params;
        try {
            const locacao = await LocacaoRepository.findById(id);
            if (locacao) {
                res.json(locacao);
            } else {
                res.status(404).json({ error: "Locação não encontrada" });
            }
        } catch (err) {
            res.status(500).json({ error: "Erro na busca da locação", err });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { data_inicio, data_final, data_devolucao, cliente_id } = req.body;
        try {
            const locacaoAtualizada = await LocacaoRepository.updateLocacao(id, {
                data_inicio, data_final, data_devolucao, cliente_id
            });
            if (locacaoAtualizada) {
                res.json(locacaoAtualizada);
            } else {
                res.status(404).json({ error: "Locação não encontrada para atualização" });
            }
        } catch (err) {
            res.status(500).json({ error: "Erro ao atualizar locação", err });
        }
    },

    async destroy(req, res) {
        const { id } = req.params;
        try {
            const locacaoDeletada = await LocacaoRepository.deleteLocacao(id);
            if (locacaoDeletada) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Locação não encontrada para exclusão" });
            }
        } catch (err) {
            res.status(500).json({ error: "Erro ao excluir locação", err });
        }
    }
}

export default LocacaoController;
