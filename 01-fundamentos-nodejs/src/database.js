import fs from "node:fs/promises";

const databasePath = new URL("db.json", import.meta.url);

export class Database {
  // # significa que a variável é privada e só pode ser acessada dentro da classe
  #database = {};

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2));
  }

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        /**
         * Quando usa o entries, ele retorna um array de arrays, onde o primeiro elemento é a chave e o segundo é o valor.
         * {'name': 'Adelmo', 'email': 'contato@adelmodias.com.br'}
         * [['name', 'Adelmo'], ['email', 'contato@adelmodias.com.br']]
         *
         * O .some() é um método que verifica se algum elemento do array atende a condição.
         */
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
