import { randomUUID } from "node:crypto";

import { buildRoutePath } from "./utils/build-route-path.js";

import { Database } from "./database.js";
const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const { search } = request.query;
      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null,
      );
      return response.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const { title, description, completed } = request.body;
      database.insert("tasks", { id: randomUUID(), title, description, completed });
      return response.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      const { title, description } = request.body;
      const task = database.select("tasks", { id });
      if (task.length === 0) {
        return response.writeHead(404).end("Tarefa não encontrada.");
      }
      database.update("tasks", id, { title, description, completed: task[0].completed });
      return response.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (request, response) => {
      const { id } = request.params;
      const task = database.select("tasks", { id });
      if (task.length === 0) {
        return response.writeHead(404).end("Tarefa não encontrada.");
      }
      if (task[0].completed === 1) {
        return response.writeHead(400).end("Tarefa já completada.");
      }
      database.update("tasks", id, { title: task[0].title, description: task[0].description, completed: 1 });
      return response.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      const task = database.select("tasks", { id });
      if (task.length === 0) {
        return response.writeHead(404).end("Tarefa não encontrada.");
      }
      database.delete("tasks", id);
      return response.writeHead(204).end();
    },
  },
];
