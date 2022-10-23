import { disableLogs } from '/lib/oop/utils/helper.util';
import { NS }          from 'Bitburner';


class StorageManager {
  constructor(
    private ns: NS,
  ) {
    this.init();
  }

  public get(
    key: string,
  ): string | null {
    return localStorage.getItem(key);
  }

  public set(
    key: string,
    value: string,
  ): void {
    localStorage.setItem(
      key,
      value,
    );
  }

  private init(): void {
    disableLogs(
      this.ns,
      [
        'disableLog',
      ],
    );
  }
}

export { StorageManager };
