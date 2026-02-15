// CommonJS => require .... const http = require("http");
// ESModules => import/export .... import http from "http";
import http from "node:http";

// Stateful - Salva o estado da aplicação em memória até que a aplicacão seja reiniciada
// Stateless - Não salva nada em memória, a aplicação vai guardar as informações em um banco de dados.

// JSON - Javascript Object Notation

// Cabeçalho (Requisicão/Resposta) => Metadados - Informações adicionais

// HTTP Status Code => 200, 201, 400, 404, 500

const users = [];

const server = http.createServer((request, response) => {
  /*
    Requisições HTTP
    - Método HTTP
    - URL

    Métodos: GET, POST, PUT, PATCH, DELETE

    GET => Buscar uma informação
    POST => Inserir (Criar) uma informação
    PUT => Alterar uma informaçãos
    PATCH => Alterar uma informação específica
    DELETE => Deletar uma informação
    */
  const { method, url } = request;

  if (method == "GET" && url == "/users") {
    // Early return
    return response.setHeader("Content-Type", "application/json").end(JSON.stringify(users));
  }

  if (method == "POST" && url == "/users") {
    users.push({ id: 1, name: "Adelmo", email: "contato@adelmodias.com.br" });
    return response.writeHead(201).end();
  }

  return response.writeHead(404).end("Not Found");
});

server.listen(3333, () => {
  console.log("Server is running on port 3000");
});
