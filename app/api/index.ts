import env from "~/env.json";

const baseApiUrl = "https://finnhub.io/api/v1";

/**
 *
 * @param method HTTP method.
 * @param token Authorization token. Uses default value from environment if not provided.
 * @param body Body data if needed.
 */
const getConfig = (method: string = "GET", token: string = env.token, body?: string): RequestInit => ({
  method, // *GET, POST, PUT, DELETE, etc.
  //mode: 'cors', // no-cors, *cors, same-origin
  //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    'X-Finnhub-Token': token
  },
  //redirect: 'follow', // manual, *follow, error
  //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body // body data type must match "Content-Type" header
})

const ApiUrls = {
  search: `${baseApiUrl}/search?q=`,
  stocksForExchange: `${baseApiUrl}/stock/symbol?exchange=`,
  exchange: `${baseApiUrl}/forex/exchange`,
};

interface ApiClient {
  search: (q: string) => Promise<SearchResult>
  stocksForExchange: (q: string) => Promise<Stock[]>
  exchange: () => Promise<string[]>
}

/**
 * Generic fetch function.
 * @param url Request URL.
 * @param config
 */
const fetchData = <T>(url: string, config: RequestInit = getConfig()) => (
  fetch(url, config)
  .then(response => response.json())
  .then(data => data as T)
);

interface Symbol {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

interface Stock {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
}

interface SearchResult {
  count: number;
  result: Symbol[]
}

export const finHubApiClient: ApiClient = {
  search: (q: string) => fetchData<SearchResult>(ApiUrls.search + q),
  stocksForExchange: (q: string) => fetchData<Stock[]>(ApiUrls.stocksForExchange + q),
  exchange: () => fetchData<string[]>(ApiUrls.exchange),
};
