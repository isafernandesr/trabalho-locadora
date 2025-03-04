class LocacaoItem {
    constructor(id, locacao_id, filme_id, preco) {
        this.id = id;
        this.locacao_id = locacao_id;
        this.filme_id = filme_id;
        this.preco = preco;
    }
    setId(id) {
        this.id = id;
    }
    setLocacao_id(locacao_id) {
        this.locacao_id = locacao_id;
    }
    setFilme_id(filme_id) {
        this.filme_id = filme_id;
    }
    setPreco(preco) {
        this.preco = preco;
    }
    getId() {
        return this.id;
    }
    getLocacao_id() {
        return this.locacao_id;
    }
    getFilme_id() {
        return this.filme_id;
    }
    getPreco() {
        return this.preco;
    }
}

export default LocacaoItem;