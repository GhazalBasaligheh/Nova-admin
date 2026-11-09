export enum ApiErrorKind {
  // Non-JSON response (e.g. a bot-challenge page).
  Blocked = 'blocked',
  // No response: timeout, DNS failure, connection reset, or a CORS rejection.
  Network = 'network',
  // 401/403: missing or rejected credentials.
  Unauthorized = 'unauthorized',
  // Other 4xx (e.g. 400 for bad login input).
  Client = 'client',
  // 5xx.
  Server = 'server',
  // Response did not have the expected shape.
  Parse = 'parse',
  // Aborted by the caller.
  Canceled = 'canceled',
}
