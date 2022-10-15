import { NS } from 'Bitburner';


class StorageManager {
  constructor(
    private ns: NS,
  ) {
  }

  public get(key: string): string | null {
    return localStorage.getItem(key);
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}

export { StorageManager };
