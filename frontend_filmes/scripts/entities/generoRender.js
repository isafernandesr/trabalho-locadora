import { get, post, put, del } from "../api.js";
import state from "../state.js";

const carregarGeneros = async () => {
    const generos = await get("http://localhost:3000/generos");
    state.generos = generos;

    renderizarListaGeneros(generos);
};

const renderizarListaGeneros = (generos) => {
    let tabela = `
        <button type="button" class="btn btn-primary" id="novo-genero">Cadastrar novo gênero</button>
        <h2 class="py-3">Listagem de Gêneros</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    let bodyTabela = generos.map(genero => `
        <tr>
            <td>${genero.id}</td>
            <td>${genero.nome}</td>
            <td>
                <button class="btn btn-warning btn-sm editar-genero" data-id="${genero.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm excluir-genero" data-id="${genero.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join(" ");

    tabela = tabela + bodyTabela + "</tbody></table>";
    document.getElementById("app-content").innerHTML = tabela;

    document.getElementById("novo-genero").addEventListener("click", () => {
        renderizarFormularioGenero();
    });

    document.querySelectorAll(".editar-genero").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.closest("button").getAttribute("data-id");
            const genero = await get(`http://localhost:3000/generos/${id}`);
            renderizarFormularioEdicao(genero);
        });
    });

    document.querySelectorAll(".excluir-genero").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.closest("button").getAttribute("data-id");
            if (confirm("Tem certeza que deseja excluir este gênero?")) {
                await del(`http://localhost:3000/generos/${id}`);
                await carregarGeneros();
            }
        });
    });
};

const renderizarFormularioGenero = () => {
    const formulario = `
        <form id="form-genero">
            <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" id="nome" class="form-control" placeholder="Digite o nome do gênero">
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top:10px">Cadastrar</button>
        </form>
    `;

    document.getElementById("app-content").innerHTML = formulario;

    document.getElementById("form-genero").addEventListener("submit", async (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        await post("http://localhost:3000/generos", { nome });
        await carregarGeneros();
    });
};

const renderizarFormularioEdicao = (genero) => {
    const formulario = `
        <form id="form-editar-genero">
            <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" id="nome" class="form-control" value="${genero.nome}">
            </div>
            <button type="submit" class="btn btn-success" style="margin-top:10px">Atualizar</button>
        </form>
    `;

    document.getElementById("app-content").innerHTML = formulario;

    document.getElementById("form-editar-genero").addEventListener("submit", async (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;

        await put(`http://localhost:3000/generos/${genero.id}`, { nome });
        await carregarGeneros();
    });
};

export default carregarGeneros;
