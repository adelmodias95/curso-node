// CommonJS => require .... const http = require("http");
// ESModules => import/export .... import http from "http";
import http from "node:http";

// node:crypto randomUUID => gera um UUID aleatório
import { randomUUID } from "node:crypto";

// middleware é um interceptador de requisições e respostas
// sempre vão receber o request e o response e vão executar uma função antes de continuar
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

// Stateful - Salva o estado da aplicação em memória até que a aplicacão seja reiniciada
// Stateless - Não salva nada em memória, a aplicação vai guardar as informações em um banco de dados.

// JSON - Javascript Object Notation

// Cabeçalho (Requisicão/Resposta) => Metadados - Informações adicionais

// HTTP Status Code => 200, 201, 400, 404, 500

const database = new Database();

const server = http.createServer(async (request, response) => {
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

  await json(request, response);

  if (method == "GET" && url == "/users") {
    // Early return
    // é quando o retorno é feito antes de terminar a função
    return response.end(JSON.stringify(database.select("users")));
  }

  if (method == "POST" && url == "/users") {
    const { name, email } = request.body;
    database.insert("users", { id: randomUUID(), name, email });
    return response.writeHead(201).end();
  }

  return response.writeHead(404).end("Not Found");
});

server.listen(3333, () => {
  console.log("Server is running on port 3000");
});
