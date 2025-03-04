import { get, post, put, del } from "../api.js";
import state from "../state.js";

const carregarClientes = async () => {
    const clientes = await get("http://localhost:3000/clientes");
    state.clientes = clientes;

    renderizarListaClientes(clientes);
};

const renderizarListaClientes = (clientes) => {
    let tabela = `
        <button type="button" class="btn btn-primary" id="novo-cliente">Cadastrar novo cliente</button>
        <h2 class="py-3">Listagem de Clientes</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Email</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    let bodyTabela = clientes.map(cliente => `
        <tr>
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.email}</td>
            <td>${cliente.cpf}</td>
            <td>
                <button class="btn btn-warning btn-sm editar-cliente" data-id="${cliente.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm excluir-cliente" data-id="${cliente.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join(" ");

    tabela = tabela + bodyTabela + "</tbody></table>";
    document.getElementById("app-content").innerHTML = tabela;

    document.getElementById("novo-cliente").addEventListener("click", () => {
        renderizarFormularioCliente();
    });

    document.querySelectorAll(".editar-cliente").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.closest("button").getAttribute("data-id");
            const cliente = await get(`http://localhost:3000/clientes/${id}`);
            renderizarFormularioEdicao(cliente);
        });
    });

    document.querySelectorAll(".excluir-cliente").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.closest("button").getAttribute("data-id");
            if (confirm("Tem certeza que deseja excluir este cliente?")) {
                await del(`http://localhost:3000/clientes/${id}`);
                await carregarClientes();
            }
        });
    });
};

const renderizarFormularioCliente = () => {
    const formulario = `
        <form id="form-cliente">
            <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" id="nome" class="form-control" placeholder="Digite o nome do cliente">
            </div>
            <div class="form-group">
                <label for="endereco">Endereço</label>
                <input type="text" id="endereco" class="form-control" placeholder="Digite o endereço">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" placeholder="Digite o email">
            </div>
            <div class="form-group">
                <label for="cpf">CPF</label>
                <input type="text" id="cpf" class="form-control" placeholder="Digite o CPF">
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top:10px">Salvar</button>
        </form>
    `;

    document.getElementById("app-content").innerHTML = formulario;

    document.getElementById("form-cliente").addEventListener("submit", async (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const endereco = document.getElementById("endereco").value;
        const email = document.getElementById("email").value;
        const cpf = document.getElementById("cpf").value;

        await post("http://localhost:3000/clientes", { nome, endereco, email, cpf });
        await carregarClientes();
    });
};

const renderizarFormularioEdicao = (cliente) => {
    const formulario = `
        <form id="form-editar-cliente">
            <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" id="nome" class="form-control" value="${cliente.nome}">
            </div>
            <div class="form-group">
                <label for="endereco">Endereço</label>
                <input type="text" id="endereco" class="form-control" value="${cliente.endereco}">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" value="${cliente.email}">
            </div>
            <div class="form-group">
                <label for="cpf">CPF</label>
                <input type="text" id="cpf" class="form-control" value="${cliente.cpf}">
            </div>
            <button type="submit" class="btn btn-success" style="margin-top:10px">Atualizar</button>
        </form>
    `;

    document.getElementById("app-content").innerHTML = formulario;

    document.getElementById("form-editar-cliente").addEventListener("submit", async (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const endereco = document.getElementById("endereco").value;
        const email = document.getElementById("email").value;
        const cpf = document.getElementById("cpf").value;

        await put(`http://localhost:3000/clientes/${cliente.id}`, { nome, endereco, email, cpf });
        await carregarClientes();
    });
};

export default carregarClientes;
