import { disableLogs }       from '/lib/oop/utils/helper.util';
import { NS, NetscriptPort } from 'Bitburner';


class Port {
  constructor(
    private ns: NS,
  ) {
    this.init();
  }

  public getPort(
    id: number,
  ): NetscriptPort {
    return this.ns.getPortHandle(id);
  }

  private init(): void {
    disableLogs(
      this.ns,
      [
        'disableLog',
        'getPortHandle',
      ],
    );
  }
}

export { Port };
