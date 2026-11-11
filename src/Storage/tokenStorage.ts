// Current strategy: sessionStorage. Survives a refresh within the tab,
// cleared when the tab closes. Readable by any script on the page, so it is exposed to XSS;
// the README documents the HttpOnly-cookie production design this demo can't use without a backend.

const TOKEN_KEY = 'nova-admin-token';

export const tokenStorage = {
  get(): string | null {
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string): void {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch {
      // storage unavailable: the session lasts until refresh
    }
  },
  clear(): void {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      // nothing to clear
    }
  },
};
