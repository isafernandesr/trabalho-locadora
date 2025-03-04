import Cliente from "../models/Cliente.js";
import connection1 from "../config/dbConnect.js";

const ClienteRepository = {

    async findAll() {
        const rows = await connection1.query("select * from cliente", []);
        return rows.map(row => new Cliente(row.id, row.nome, row.endereco, row.email, row.cpf));
    },

    async createCliente(cliente) {
        const result = await connection1.query("insert into cliente (nome, endereco, email, cpf) values (?, ?, ?, ?)",
            [cliente.nome, cliente.endereco, cliente.email, cliente.cpf],
        );

        cliente.id = result.insertId;
        return cliente;
    },

    async findById(id) {
        const [row] = await connection1.query("select * from cliente where id = ?", [id]);
        if (row) {
            return new Cliente(row.id, row.nome, row.endereco, row.email, row.cpf);
        }
        return null;
    },

    async updateCliente(id, cliente) {
        await connection1.query("update cliente set nome = ?, endereco = ?, email = ?, cpf = ? where id = ?",
            [cliente.nome, cliente.endereco, cliente.email, cliente.cpf, id]
        );
        return { id, ...cliente };
    },

    async deleteCliente(id) {
        await connection1.query("delete from cliente where id = ?", [id]);
        return { message: "Cliente deletado com sucesso" };
    }
}

export default ClienteRepository;