import Genero from "../models/Genero.js";
import connection1 from "../config/dbConnect.js";

const GeneroRepository = {

    async findAll() {
        const rows = await connection1.query("select * from genero", []);
        return rows.map(row => new Genero(row.id, row.nome));
    },

    async createGenero(genero) {
        const result = await connection1.query("insert into genero (nome) values (?)",
            [genero.nome]
        );
        genero.id = result.insertId;
        return genero;
    },

    async findById(id) {
        const [row] = await connection1.query("select * from genero where id = ?", [id]);
        if (row) {
            return new Genero(row.id, row.nome);
        }
        return null;
    },

    async updateGenero(id, genero) {
        await connection1.query("update genero set nome = ? where id = ?",
            [genero.nome, id]
        );
        return { id, ...genero };
    },

    async deleteGenero(id) {
        await connection1.query("delete from genero where id = ?", [id]);
        return { message: "Gênero deletado com sucesso" };
    }
}

export default GeneroRepository;