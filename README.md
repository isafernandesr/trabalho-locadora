# Documentação

## Regras de negócio

- CRUD
    - Gêneros
    - Filmes
    - Clientes
    - Locação
    - Locação Item
- Para criação de um filme, é necessário ter no mínimo, um gênero.
- Para criação de locação é necessário ter, no mínimo, um cliente.
- Para criação de locação item é necessário ter, no mínimo, uma locação e um filme.
- Foram implementadas algumas funcionalidades de quantidade de locações por cliente, data de entrega, entre outras.
- Não foi implementado autenticação.

## Para rodar

Necessário `node` e `npm` instalados.

### backend

- Rode o `npm install` no diretório.
- Crie uma base de dados "backend_filmes" de forma manual. Isso pode ser feito pelo MySQL CLI ou por alguma ferramenta de gerenciamento de banco de dados.
- Depois disso, rode `npm run migrate` para criar as tabelas e, em seguida, `npm start` para subir a API localmente.

### frontend
- É necessário apenas a extensão "live server" do VSCode para simular um servidor web.
    - Instale a extensão.
    - Use a extensão para hostear o index.html.