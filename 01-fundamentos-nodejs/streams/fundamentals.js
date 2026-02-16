// Streams ->

// stdin = tudo que o usuário digita no terminal
// stdout = tudo que o usuário vê no terminal
// process.stdin.pipe(process.stdout);

// Transform -> Transforma o dado recebido e adiciona ao stream
// Writable -> Escreve o dado recebido e adiciona ao stream
// Readable -> Lê o dado recebido e adiciona ao stream
import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        // Buffer é uma estrutura de dados que permite armazenar dados binários
        // String(i) é o valor que queremos converter para buffer
        // Buffer.from(String(i)) é o buffer que será criado
        // Não é permitido adicionar strings diretamente ao stream, é necessário converter para buffer
        const buf = Buffer.from(String(i));
        // push é o método que permite adicionar dados ao stream
        // buf é o buffer que será adicionado ao stream
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    // Primeiro parametro é o erro (null)
    // Segundo parametro é o buffer que será adicionado ao stream
    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTenStream extends Writable {
  // chunk é o buffer (pedaço) que foi recebido do stream anterior
  // encoding é o tipo de encoding que foi usado (utf-8, base64, etc.)
  // callback é a função que será chamada quando o dado for escrito
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

// Pipe -> Conecta o stream de entrada ao stream de saída
new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream());
