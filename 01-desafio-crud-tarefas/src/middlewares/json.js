/**
 * Essa função serve para converter o corpo da requisição em um objeto JSON
 * E adicionar ao request.body.
 */
export async function json(request, response) {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    request.body = null;
  }

  response.setHeader("Content-Type", "application/json");
}
