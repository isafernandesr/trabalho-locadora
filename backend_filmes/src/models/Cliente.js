class Categoria {
    constructor(id, nome, endereco, email, cpf) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.email = email;
        this.cpf = cpf;
    }
    setId(id) {
        this.id = id;
    }
    setNome(nome) {
        this.nome = nome;
    }
    setEndereco(endereco) {
        this.endereco = endereco;
    }
    setEmail(email) {
        this.email = email;
    }
    setCpf(cpf) {
        this.cpf = cpf;
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getEndereco() {
        return this.endereco;
    }
    getEmail() {
        return this.email;
    }
    getCpf() {
        return this.cpf;
    }
}

export default Categoria;