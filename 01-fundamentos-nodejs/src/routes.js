// node:crypto randomUUID => gera um UUID aleatório
import { randomUUID } from "node:crypto";

import { Database } from "./database.js";

import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const users = database.select("users");
      return response.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const { name, email } = request.body;
      database.insert("users", { id: randomUUID(), name, email });
      return response.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      database.delete("users", id);
      return response.writeHead(204).end();
    },
  },
];
