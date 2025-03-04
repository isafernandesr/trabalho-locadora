import Locacao from "../models/Locacao.js";
import connection1 from "../config/dbConnect.js";

const LocacaoRepository = {

    async findAll() {
        const rows = await connection1.query("SELECT * FROM locacao", []);
        return rows.map(row => new Locacao(row.id, row.data_inicio, row.data_final, row.data_devolucao, row.cliente_id));
    },

    async createLocacao(locacao) {
        const result = await connection1.query("INSERT INTO locacao (data_inicio, data_final, cliente_id) VALUES (?, ?, ?)",
            [locacao.data_inicio, locacao.data_final, locacao.cliente_id]
        );
        locacao.id = result.insertId;
        return locacao;
    },

    async findById(id) {
        const [row] = await connection1.query("SELECT * FROM locacao WHERE id = ?", [id]);
        if (row) {
            return new Locacao(row.id, row.data_inicio, row.data_final, row.data_devolucao, row.cliente_id);
        }
        return null;
    },

    async updateLocacao(id, dados) {
        const result = await connection1.query(
            "UPDATE locacao SET data_inicio = ?, data_final = ?, data_devolucao = ?, cliente_id = ? WHERE id = ?",
            [dados.data_inicio, dados.data_final, dados.data_devolucao, dados.cliente_id, id]
        );

        if (result.affectedRows === 0) {
            return null;
        }

        return { ...dados, id };
    },

    async deleteLocacao(id) {
        const result = await connection1.query("DELETE FROM locacao WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return null;
        }

        return true;
    }
}

export default LocacaoRepository;
