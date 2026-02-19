/**
 * Essa função serve para extrair os query parameters da URL.
 */
// '?search=Adelmo'
export function extractQueryParams(query) {
  return query
    .substr(1)
    .split("&")
    .reduce((queryParams, param) => {
      const [key, value] = param.split("=");
      queryParams[key] = value;
      return queryParams;
    }, {});
}
