class Locacao {
    constructor(id, data_inicio, data_final, data_devolucao, cliente_id) {
        this.id = id;
        this.data_inicio = data_inicio;
        this.data_final = data_final;
        this.data_devolucao = data_devolucao;
        this.cliente_id = cliente_id;
    }
    setId(id) {
        this.id = id;
    }
    setData_inicio(data_inicio) {
        this.data_inicio = data_inicio;
    }
    setData_final(data_final) {
        this.data_final = data_final;
    }
    setData_devolucao(data_devolucao) {
        this.data_devolucao = data_devolucao;
    }
    setCliente_id(cliente_id) {
        this.cliente_id = cliente_id;
    }
    getId() {
        return this.id;
    }
    getData_inicio() {
        return this.data_inicio;
    }
    getData_final() {
        return this.data_final;
    }
    getData_devolucao() {
        return this.data_devolucao;
    }
    getCliente_id() {
        return this.cliente_id;
    }
}

export default Locacao;