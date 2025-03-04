import { get, post, put, del } from "../api.js";
import state from "../state.js";

const carregarFilmes = async () => {
    const filmes = await get("http://localhost:3000/filmes");

    for (let filme of filmes) {
        const genero = await get(`http://localhost:3000/generos/${filme.genero_id}`);
        filme.genero_nome = genero ? genero.nome : "Desconhecido";
        filme.status_nome = filme.status === 1 ? "Disponível" : "Alugado";
    }

    state.filmes = filmes;
    renderizarListaFilmes(filmes);
};

const renderizarListaFilmes = (filmes) => {
    let tabela = `
        <button type="button" class="btn btn-primary" id="novo-filme">Cadastrar novo filme</button>
        <h2 class="py-3">Listagem de Filmes</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Título</th>
                    <th scope="col">Gênero</th>
                    <th scope="col">Ano</th>
                    <th scope="col">Diretor</th>
                    <th scope="col">Sinopse</th>
                    <th scope="col">Classificação</th>
                    <th scope="col">Elenco</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    let bodyTabela = filmes.map(filme => `
        <tr>
            <td>${filme.id}</td>
            <td>${filme.titulo}</td>
            <td>${filme.genero_nome}</td>
            <td>${filme.ano}</td>
            <td>${filme.diretor}</td>
            <td>${filme.sinopse}</td>
            <td>${filme.classificacao}</td>
            <td>${filme.elenco}</td>
            <td>${filme.status_nome}</td>
            <td>
                <button class="btn btn-warning btn-sm editar-filme" data-id="${filme.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm excluir-filme" data-id="${filme.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join(" ");

    tabela = tabela + bodyTabela + "</tbody></table>";
    document.getElementById("app-content").innerHTML = tabela;

    document.getElementById("novo-filme").addEventListener("click", () => {
        renderizarFormularioFilme();
    });

    document.querySelectorAll(".editar-filme").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.closest("button").getAttribute("data-id");
            const filme = await get(`http://localhost:3000/filmes/${id}`);
            renderizarFormularioEdicao(filme);
        });
    });

    document.querySelectorAll(".excluir-filme").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.closest("button").getAttribute("data-id");
            if (confirm("Tem certeza que deseja excluir este filme?")) {
                await del(`http://localhost:3000/filmes/${id}`);
                await carregarFilmes();
            }
        });
    });
};

const renderizarFormularioFilme = async () => {
    const generos = await get("http://localhost:3000/generos");

    const opcoesGeneros = generos.map(genero => `
        <option value="${genero.id}">${genero.nome}</option>
    `).join(" ");

    const formulario = `
        <form id="form-filme">
            <div class="form-group">
                <label for="titulo">Título</label>
                <input type="text" id="titulo" class="form-control" placeholder="Digite o título do filme">
            </div>
            <div class="form-group">
                <label for="genero">Gênero</label>
                <select id="genero" class="form-control">
                    ${opcoesGeneros}
                </select>
            </div>
            <div class="form-group">
                <label for="ano">Ano</label>
                <input type="number" id="ano" class="form-control" placeholder="Digite o ano do filme">
            </div>
            <div class="form-group">
                <label for="diretor">Diretor</label>
                <input type="text" id="diretor" class="form-control" placeholder="Digite o nome do diretor">
            </div>
            <div class="form-group">
                <label for="sinopse">Sinopse</label>
                <input type="text" id="sinopse" class="form-control" placeholder="Digite a sinopse">
            </div>
            <div class="form-group">
                <label for="classificacao">Classificação</label>
                <input type="text" id="classificacao" class="form-control" placeholder="Insira a classificação">
            </div>
            <div class="form-group">
                <label for="elenco">Elenco</label>
                <input type="text" id="elenco" class="form-control" placeholder="Digite o nome do elenco">
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top:10px">Salvar</button>
        </form>
    `;
    document.getElementById("app-content").innerHTML = formulario;

    document.getElementById("form-filme").addEventListener("submit", async (e) => {
        e.preventDefault();
        const titulo = document.getElementById("titulo").value;
        const genero_id = document.getElementById("genero").value;
        const ano = document.getElementById("ano").value;
        const diretor = document.getElementById("diretor").value;
        const sinopse = document.getElementById("sinopse").value;
        const classificacao = document.getElementById("classificacao").value;
        const elenco = document.getElementById("elenco").value;
        const status = 1;

        await post("http://localhost:3000/filmes", { titulo, genero_id, ano, diretor, sinopse, classificacao, elenco, status });
        await carregarFilmes();
    });
};

const renderizarFormularioEdicao = async (filme) => {
    const generos = await get("http://localhost:3000/generos");

    const opcoesGeneros = generos.map(genero => `
        <option value="${genero.id}" ${genero.id === filme.genero_id ? 'selected' : ''}>${genero.nome}</option>
    `).join(" ");

    const formulario = `
        <form id="form-editar-filme">
            <div class="form-group">
                <label for="titulo">Título</label>
                <input type="text" id="titulo" class="form-control" value="${filme.titulo}">
            </div>
            <div class="form-group">
                <label for="genero">Gênero</label>
                <select id="genero" class="form-control">
                    ${opcoesGeneros}
                </select>
            </div>
            <div class="form-group">
                <label for="ano">Ano</label>
                <input type="number" id="ano" class="form-control" value="${filme.ano}">
            </div>
            <div class="form-group">
                <label for="diretor">Diretor</label>
                <input type="text" id="diretor" class="form-control" value="${filme.diretor}">
            </div>
            <div class="form-group">
                <label for="sinopse">Sinopse</label>
                <input type="text" id="sinopse" class="form-control" value="${filme.sinopse}">
            </div>
            <div class="form-group">
                <label for="classificacao">Classificação</label>
                <input type="text" id="classificacao" class="form-control" value="${filme.classificacao}">
            </div>
            <div class="form-group">
                <label for="elenco">Elenco</label>
                <input type="text" id="elenco" class="form-control" value="${filme.elenco}">
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select id="status" class="form-control">
                    <option value="1" ${filme.status === 1 ? 'selected' : ''}>Disponível</option>
                    <option value="2" ${filme.status === 2 ? 'selected' : ''}>Alugado</option>
                </select>
            </div>
            <button type="submit" class="btn btn-success" style="margin-top:10px">Atualizar</button>
        </form>
    `;
    document.getElementById("app-content").innerHTML = formulario;

    document.getElementById("form-editar-filme").addEventListener("submit", async (e) => {
        e.preventDefault();
        const titulo = document.getElementById("titulo").value;
        const genero_id = document.getElementById("genero").value;
        const ano = document.getElementById("ano").value;
        const diretor = document.getElementById("diretor").value;
        const sinopse = document.getElementById("sinopse").value;
        const classificacao = document.getElementById("classificacao").value;
        const elenco = document.getElementById("elenco").value;
        const status = document.getElementById("status").value;

        await put(`http://localhost:3000/filmes/${filme.id}`, { titulo, genero_id, ano, diretor, sinopse, classificacao, elenco, status });
        await carregarFilmes();
    });
};

export default carregarFilmes;
