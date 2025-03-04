class Filme {
    constructor(id, titulo, genero_id, ano, diretor, sinopse, classificacao, elenco, status) {
        this.id = id;
        this.titulo = titulo;
        this.genero_id = genero_id;
        this.ano = ano;
        this.diretor = diretor;
        this.sinopse = sinopse;
        this.classificacao = classificacao;
        this.elenco = elenco;
        this.status = status;
    }

    // Getters
    getId() {
        return this.id;
    }
    getTitulo() {
        return this.titulo;
    }
    getGeneroId() {
        return this.genero_id;
    }
    getAno() {
        return this.ano;
    }
    getDiretor() {
        return this.diretor;
    }
    getSinopse() {
        return this.sinopse;
    }
    getClassificacao() {
        return this.classificacao;
    }
    getElenco() {
        return this.elenco;
    }
    getStatus() {
        return this.status;
    }

    // Setters
    setId(id) {
        this.id = id;
    }
    setTitulo(titulo) {
        this.titulo = titulo;
    }
    setGeneroId(genero_id) {
        this.genero_id = genero_id;
    }
    setAno(ano) {
        this.ano = ano;
    }
    setDiretor(diretor) {
        this.diretor = diretor;
    }
    setSinopse(sinopse) {
        this.sinopse = sinopse;
    }
    setClassificacao(classificacao) {
        this.classificacao = classificacao;
    }
    setElenco(elenco) {
        this.elenco = elenco;
    }
    setStatus(status) {
        this.status = status;
    }
}

export default Filme;
