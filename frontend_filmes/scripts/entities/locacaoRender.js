import { get, post, put, del } from "../api.js";
import state from "../state.js";

const carregarLocacoes = async () => {
    const locacoes = await get("http://localhost:3000/locacoes");
    state.locacoes = locacoes;
    renderizarListaLocacoes(locacoes);
};

const renderizarListaLocacoes = async (locacoes) => {
    const locacoesAtivas = locacoes.filter(locacao => !locacao.data_devolucao);

    let tabela = `
        <button type="button" class="btn btn-primary" id="nova-locacao">Nova Locação</button>
        <h2 class="py-3">Listagem de Locações</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Data de Locação</th>
                    <th scope="col">Data Final</th>
                    <th scope="col">Data de Devolução</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    let bodyTabela = await Promise.all(locacoesAtivas.map(async locacao => {
        const cliente = await get(`http://localhost:3000/clientes/${locacao.cliente_id}`);
        return `
            <tr>
                <td>${locacao.id}</td>
                <td>${cliente.nome}</td>
                <td>${new Date(locacao.data_inicio).toLocaleDateString()}</td>
                <td>${new Date(locacao.data_final).toLocaleDateString()}</td>
                <td>${locacao.data_devolucao ? new Date(locacao.data_devolucao).toLocaleDateString() : ''}</td>
                <td>
                    <button class="btn btn-warning btn-sm editar-locacao" data-id="${locacao.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm excluir-locacao" data-id="${locacao.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }));

    tabela += bodyTabela.join(" ") + "</tbody></table>";
    document.getElementById("app-content").innerHTML = tabela;

    document.getElementById("nova-locacao").addEventListener("click", () => {
        renderizarFormularioLocacao();
    });

    document.querySelectorAll(".editar-locacao").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.closest("button").getAttribute("data-id");
            const locacao = await get(`http://localhost:3000/locacoes/${id}`);
            renderizarFormularioEdicaoLocacao(locacao);
        });
    });

    document.querySelectorAll(".excluir-locacao").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.closest("button").getAttribute("data-id");
            if (confirm("Tem certeza que deseja excluir esta locação?")) {
                await del(`http://localhost:3000/locacoes/${id}`);
                await carregarLocacoes();
            }
        });
    });
};

const renderizarFormularioLocacao = async () => {
    const clientes = await get("http://localhost:3000/clientes");
    const clienteOptions = clientes.map(cliente => `<option value="${cliente.id}">${cliente.nome}</option>`).join(" ");

    const formulario = `
        <form id="form-locacao">
            <div class="form-group">
                <label for="cliente">Cliente</label>
                <select id="cliente" class="form-control">${clienteOptions}</select>
            </div>
            <div class="form-group">
                <label for="data-locacao">Data de Locação</label>
                <input type="date" id="data-locacao" class="form-control">
            </div>
            <div class="form-group">
                <label for="data-final">Data Final</label>
                <input type="date" id="data-final" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top:10px">Salvar</button>
        </form>
    `;

    document.getElementById("app-content").innerHTML = formulario;

    document.getElementById("form-locacao").addEventListener("submit", async (e) => {
        e.preventDefault();
        const cliente_id = document.getElementById("cliente").value;
        const data_inicio = document.getElementById("data-locacao").value;
        const data_final = document.getElementById("data-final").value;

        await post("http://localhost:3000/locacoes", { cliente_id, data_inicio, data_final });
        await carregarLocacoes();
    });
};

const renderizarFormularioEdicaoLocacao = async (locacao) => {
    const clientes = await get("http://localhost:3000/clientes");
    const clienteOptions = clientes.map(cliente => `
        <option value="${cliente.id}" ${cliente.id === locacao.cliente_id ? 'selected' : ''}>${cliente.nome}</option>
    `).join(" ");

    const formulario = `
        <form id="form-editar-locacao">
            <div class="form-group">
                <label for="cliente">Cliente</label>
                <select id="cliente" class="form-control">${clienteOptions}</select>
            </div>
            <div class="form-group">
                <label for="data-locacao">Data de Locação</label>
                <input type="date" id="data-locacao" class="form-control" value="${new Date(locacao.data_inicio).toLocaleDateString('en-ca')}">
            </div>
            <div class="form-group">
                <label for="data-final">Data Final</label>
                <input type="date" id="data-final" class="form-control" value="${new Date(locacao.data_final).toLocaleDateString('en-ca')}">
            </div>
            <div class="form-group">
                <label for="data-devolucao">Data de Devolução</label>
                <input type="date" id="data-devolucao" class="form-control" value="${new Date(locacao.data_devolucao).toLocaleDateString('en-ca')}">
            </div>
            <button type="submit" class="btn btn-success" style="margin-top:10px">Atualizar</button>
        </form>
    `;

    document.getElementById("app-content").innerHTML = formulario;

    document.getElementById("form-editar-locacao").addEventListener("submit", async (e) => {
        e.preventDefault();
        const cliente_id = document.getElementById("cliente").value;
        const data_inicio = document.getElementById("data-locacao").value;
        const data_final = document.getElementById("data-final").value;
        const data_devolucao = document.getElementById("data-devolucao").value;

        await put(`http://localhost:3000/locacoes/${locacao.id}`, { cliente_id, data_inicio, data_final, data_devolucao });
        await carregarLocacoes();
    });
};

export default carregarLocacoes;
