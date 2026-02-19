/**
 * Passo 1: Criar um servidor HTTP
 * Passo 2: Criar o middleware de conversão de JSON
 * Passo 3: Criar o método buildRoutePath que cria uma expressão regular que corresponde ao path da rota.
 * Passo 4: Criar o método extractQueryParams que extrai os query parameters da URL.
 * Passo 5: Criar o método routes que contém todas as rotas da aplicação.
 * Passo 6: Criar o databse.json que será o banco de dados stateful da aplicação.
 * Passo 7: Ajustar as rotas para usar o database.js e retornar os dados corretamente.
 */

import http from "node:http";

import { routes } from "./routes.js";
import { json } from "./middlewares/json.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  const route = routes.find((route) => {
    /**
     * route.path.test(url) é uma expressão regular que testa se a url corresponde ao path da rota.
     */
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = request.url.match(route.path);
    // console.log(routeParams);

    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = query ? extractQueryParams(query) : {};

    // console.log(request.params);
    // console.log(request.query);

    return route.handler(request, response);
  }

  return response.writeHead(404).end("Rota não encontrada.");
});

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});
