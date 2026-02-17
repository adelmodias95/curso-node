// CommonJS => require .... const http = require("http");
// ESModules => import/export .... import http from "http";
import http from "node:http";

// middleware é um interceptador de requisições e respostas
// sempre vão receber o request e o response e vão executar uma função antes de continuar
import { json } from "./middlewares/json.js";

import { routes } from "./routes.js";

// Stateful - Salva o estado da aplicação em memória até que a aplicacão seja reiniciada
// Stateless - Não salva nada em memória, a aplicação vai guardar as informações em um banco de dados.

// JSON - Javascript Object Notation

// Cabeçalho (Requisicão/Resposta) => Metadados - Informações adicionais

// HTTP Status Code => 200, 201, 400, 404, 500

// Early return: é quando o retorno é feito antes de terminar a função

// Query parameters: ?name=Diego&age=20 - Muito utilizado para filtros, paginação, etc.
// Route parameters: /users/1 - Muito utilizado para buscar um recurso específico.
// Request body: { name: "Diego", age: 20 } - Muito utilizado para criar ou atualizar um recurso.

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

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = request.url.match(route.path);

    request.params = { ...routeParams.groups };

    return route.handler(request, response);
  }

  return response.writeHead(404).end("Not Found");
});

server.listen(3333, () => {
  console.log("Server is running on port 3000");
});
