import { get, post, put, del } from "../api.js";
import state from "../state.js";

const carregarLocacaoItens = async () => {
    try {
        const locacaoItens = await get("http://localhost:3000/locacoes-item");
        console.log("Dados obtidos da API:", locacaoItens);

        renderizarListaLocacaoItens(locacaoItens);
    } catch (err) {
        console.error("Erro ao carregar itens de locação:", err);
    }
};

const renderizarListaLocacaoItens = async (locacaoItens) => {
    try {
        console.log("Itens de locação recebidos para renderização:", locacaoItens);

        let tabela = `
            <button type="button" class="btn btn-primary" id="novo-locacao-item">Novo Item de Locação</button>
            <h2 class="py-3">Listagem de Itens de Locações</h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome do Cliente</th>
                        <th scope="col">Nome do Filme</th>
                        <th scope="col">Data de Início</th>
                        <th scope="col">Data Final</th>
                        <th scope="col">Data de Devolução</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let bodyTabela = await Promise.all(locacaoItens.map(async (locacaoItem) => {
            const locacao = await get(`http://localhost:3000/locacoes/${locacaoItem.locacao_id}`);
            const cliente = await get(`http://localhost:3000/clientes/${locacao.cliente_id}`);
            const filme = await get(`http://localhost:3000/filmes/${locacaoItem.filme_id}`);

            return `
                <tr>
                    <td>${locacaoItem.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${filme.titulo}</td>
                    <td>${new Date(locacao.data_inicio).toLocaleDateString()}</td>
                    <td>${new Date(locacao.data_final).toLocaleDateString()}</td>
                    <td>${new Date(locacao.data_devolucao).toLocaleDateString()}</td>
                    <td>${locacaoItem.preco}</td>
                    <td>
                        <button class="btn btn-warning btn-sm editar-locacao-item" data-id="${locacaoItem.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm excluir-locacao-item" data-id="${locacaoItem.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }));

        tabela += bodyTabela.join(" ") + "</tbody></table>";
        document.getElementById("app-content").innerHTML = tabela;

        document.getElementById("novo-locacao-item").addEventListener("click", () => {
            renderizarFormularioLocacaoItem();
        });

        document.querySelectorAll(".editar-locacao-item").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = e.target.closest("button").getAttribute("data-id");
                const locacaoItem = await get(`http://localhost:3000/locacoes-item/${id}`);
                renderizarFormularioEdicaoLocacaoItem(locacaoItem);
            });
        });

        document.querySelectorAll(".excluir-locacao-item").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = e.target.closest("button").getAttribute("data-id");
                if (confirm("Tem certeza que deseja excluir este item de locação?")) {
                    await del(`http://localhost:3000/locacoes-item/${id}`);
                    await carregarLocacaoItens();
                }
            });
        });
    } catch (err) {
        console.error("Erro ao renderizar lista de locação itens:", err);
    }
};

const renderizarFormularioLocacaoItem = async () => {
    try {
        const locacoes = await get("http://localhost:3000/locacoes");
        const filmes = await get("http://localhost:3000/filmes");
        const locacaoItens = await get("http://localhost:3000/locacoes-item");

        const filmesDisponiveis = filmes.filter(filme => filme.status !== 2);

        const locacoesDisponiveis = locacoes.filter(locacao =>
            !locacaoItens.some(item => item.locacao_id === locacao.id)
        );

        const locacaoOptions = await Promise.all(locacoesDisponiveis.map(async (locacao) => {
            const cliente = await get(`http://localhost:3000/clientes/${locacao.cliente_id}`);
            return `
                <option value="${locacao.id}">Cliente: ${cliente.nome} - Data Início: ${new Date(locacao.data_inicio).toLocaleDateString()}</option>
            `;
        }));

        const filmeOptions = filmesDisponiveis.map(filme => `
            <option value="${filme.id}">${filme.titulo}</option>
        `).join(" ");

        const formulario = `
            <form id="form-locacao-item">
                <div class="form-group">
                    <label for="locacao">Locação</label>
                    <select id="locacao" class="form-control">${locacaoOptions.join(" ")}</select>
                </div>
                <div class="form-group">
                    <label for="filme">Filme</label>
                    <select id="filme" class="form-control">${filmeOptions}</select>
                </div>
                <div class="form-group">
                    <label for="preco">Preço</label>
                    <input type="number" id="preco" class="form-control" step="0.01" required>
                </div>
                <button type="submit" class="btn btn-primary" style="margin-top:10px">Salvar</button>
            </form>
        `;

        document.getElementById("app-content").innerHTML = formulario;

        document.getElementById("form-locacao-item").addEventListener("submit", async (e) => {
            e.preventDefault();
            const locacao_id = document.getElementById("locacao").value;
            const filme_id = document.getElementById("filme").value;
            const preco = document.getElementById("preco").value;

            const novoItem = await post("http://localhost:3000/locacoes-item", { locacao_id, filme_id, preco });

            const filme = await get(`http://localhost:3000/filmes/${filme_id}`);
            await put(`http://localhost:3000/filmes/${filme_id}`, { ...filme, status: 2 });

            await carregarLocacaoItens();
        });
    } catch (err) {
        console.error("Erro ao renderizar formulário de locação item:", err);
    }
};

const renderizarFormularioEdicaoLocacaoItem = async (locacaoItem) => {
    try {
        const locacoes = await get("http://localhost:3000/locacoes");
        const filmes = await get("http://localhost:3000/filmes");

        const filmesDisponiveis = filmes.filter(filme => filme.status !== 2);

        const locacaoOptions = await Promise.all(locacoes.map(async (locacao) => {
            const cliente = await get(`http://localhost:3000/clientes/${locacao.cliente_id}`);
            return `
                <option value="${locacao.id}" ${locacao.id === locacaoItem.locacao_id ? 'selected' : ''}>
                    Cliente: ${cliente.nome} - Data Início: ${new Date(locacao.data_inicio).toLocaleDateString()}
                </option>
            `;
        }));

        const filmeOptions = filmesDisponiveis.map(filme => `
            <option value="${filme.id}" ${filme.id === locacaoItem.filme_id ? 'selected' : ''}>${filme.titulo}</option>
        `).join(" ");

        const formulario = `
            <form id="form-editar-locacao-item">
                <div class="form-group">
                    <label for="locacao">Locação</label>
                    <select id="locacao" class="form-control">${locacaoOptions.join(" ")}</select>
                </div>
                <div class="form-group">
                    <label for="filme">Filme</label>
                    <select id="filme" class="form-control">${filmeOptions}</select>
                </div>
                <div class="form-group">
                    <label for="preco">Preço</label>
                    <input type="number" id="preco" class="form-control" value="${locacaoItem.preco}" step="0.01" required>
                </div>
                <button type="submit" class="btn btn-success" style="margin-top:10px">Atualizar</button>
            </form>
        `;

        document.getElementById("app-content").innerHTML = formulario;

        document.getElementById("form-editar-locacao-item").addEventListener("submit", async (e) => {
            e.preventDefault();
            const locacao_id = document.getElementById("locacao").value;
            const filme_id = document.getElementById("filme").value;
            const preco = document.getElementById("preco").value;

            await put(`http://localhost:3000/locacoes-item/${locacaoItem.id}`, { locacao_id, filme_id, preco });

            const filme = await get(`http://localhost:3000/filmes/${filme_id}`);
            if (filme.status !== 2) {
                await put(`http://localhost:3000/filmes/${filme_id}`, { ...filme, status: 2 });
            }

            if (filme_id !== locacaoItem.filme_id) {
                const filmeAnterior = await get(`http://localhost:3000/filmes/${locacaoItem.filme_id}`);
                if (filmeAnterior.status !== 1) {
                    await put(`http://localhost:3000/filmes/${locacaoItem.filme_id}`, { ...filmeAnterior, status: 1 });
                }
            }

            await carregarLocacaoItens();
        });
    } catch (err) {
        console.error("Erro ao renderizar formulário de edição de locação item:", err);
    }
};

export default carregarLocacaoItens;