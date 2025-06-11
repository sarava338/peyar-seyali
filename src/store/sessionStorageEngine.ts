import type { WebStorage } from "redux-persist";

export default function createSessionStorage(): WebStorage {
  return {
    getItem(key: string): Promise<string | null> {
      return Promise.resolve(sessionStorage.getItem(key));
    },

    setItem(key: string, item: string): Promise<void> {
      sessionStorage.setItem(key, item);
      return Promise.resolve();
    },

    removeItem(key: string): Promise<void> {
      sessionStorage.removeItem(key);
      return Promise.resolve();
    },
  };
}
