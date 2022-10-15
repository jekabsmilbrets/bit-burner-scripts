import { NS, NetscriptPort } from 'Bitburner';


class Port {
  constructor(
    private ns: NS,
  ) {
  }

  public getPort(id: number): NetscriptPort {
    return this.ns.getPortHandle(id);
  }
}

export { Port };
