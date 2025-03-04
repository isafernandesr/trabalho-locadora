class Categoria {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
    setId(id) {
        this.id = id;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
}

export default Categoria;