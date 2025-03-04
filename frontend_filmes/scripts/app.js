
import carregarGeneros from "./entities/generoRender.js";
import carregarClientes from "./entities/clienteRender.js";
import carregarFilmes from "./entities/filmeRender.js";
import carregarLocacoes from "./entities/locacaoRender.js";
import carregarLocacaoItens from "./entities/locacaoItemRender.js";

const route = routeName => {
    switch (routeName) {
        case "home":
            document.getElementById("app-content").innerHTML = "Home";
            break;
        case "generos":
            carregarGeneros();
            break;
        case "clientes":
            carregarClientes();
            break;
        case "filmes":
            carregarFilmes();
            break;
        case "locacoes":
            carregarLocacoes();
            break;
        case "locacoes-item":
            carregarLocacaoItens();
            break;
        default:
            document.getElementById("app-content").innerHTML = "";
            break;
    }
};


const init = () => {
    document.querySelectorAll('[data-route]').forEach(link => {
        link.addEventListener('click', (e) => {
            const routeName = e.target.getAttribute('data-route');
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
            route(routeName);
        })
    })

    route("home");
};

window.onload = init;