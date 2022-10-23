import { SCRIPTS }                     from '/lib/oop/enums/scripts.enum';
import { disableLogs, waitForCommand } from '/lib/oop/utils/helper.util';
import { NS }                          from 'Bitburner';

class MoneyMaker {
  private serverMinSecLvl!: number;
  private serverMaxMoney!: number;
  private hostServer!: string;
  private hostServerMaxRam!: number;

  constructor(
    private ns: NS,
    private serverName: string,
    private hackingThreads: number = 1,
    private toast: boolean = true,
    private sleepTime: number = 500,
  ) {
    this.init();
  }

  public async run(): Promise<void> {
    while (true) {
      const currentServerSecLvl = this.ns.getServerSecurityLevel(this.serverName);
      const currentServerMoney = this.ns.getServerMoneyAvailable(this.serverName);

      const success = await this.hackServer(
        currentServerSecLvl,
        currentServerMoney,
      );

      if (!success) {
        break;
      }

      await this.ns.sleep(this.sleepTime);
    }
  }

  private async hackServer(
    currentServerSecLvl: number,
    currentServerMoney: number,
  ): Promise<boolean> {
    const {
      script,
      command,
    } = this.chooseAction(
      currentServerSecLvl,
      currentServerMoney,
    );

    if (!this.canRunScript(script)) {
      return false;
    }

    const pid = this.ns.run(
      script,
      this.hackingThreads,
      this.serverName,
    );

    await waitForCommand(
      this.ns,
      this.serverName,
      command,
      pid,
      this.sleepTime,
      this.toast,
    );

    return true;
  }

  private chooseAction(
    currentServerSecLvl: number,
    currentServerMoney: number,
  ): { script: string, command: string } {
    let script: string;
    let command: string;

    switch (true) {
      case currentServerSecLvl > this.serverMinSecLvl:
        this.ns.print(`Weakening ${this.serverName} current ${currentServerSecLvl} max ${this.serverMinSecLvl}`);

        script = SCRIPTS.Weaken;
        command = 'weaken';
        break;

      case currentServerMoney < this.serverMaxMoney:
        this.ns.print(`Growing ${this.serverName} current ${currentServerMoney} max ${this.serverMaxMoney}`);

        script = SCRIPTS.Grow;
        command = 'grow';
        break;

      default:
        this.ns.print(`Hacking ${this.serverName}`);

        script = SCRIPTS.Hack;
        command = 'hack';
        break;
    }

    return {
      script,
      command,
    };
  }

  private canRunScript(
    script: string,
  ): boolean {
    const serverUsedRam = this.ns.getServerUsedRam(this.hostServer);
    const scriptRam = this.ns.getScriptRam(script);

    return this.hostServerMaxRam - serverUsedRam >= scriptRam;
  }

  private init(): void {
    disableLogs(
      this.ns,
      [
        'disableLog',
        'getHostname',
        'getScriptRam',
        'getServerMoneyAvailable',
        'getServerSecurityLevel',
        'getServerUsedRam',
        'isRunning',
        'print',
        'run',
        'sleep',
        'toast',
      ],
    );

    this.hostServer = this.ns.getHostname();
    this.hostServerMaxRam = this.ns.getServerMaxRam(this.hostServer);

    this.serverMinSecLvl = this.ns.getServerMinSecurityLevel(this.serverName) + 0.05;
    this.serverMaxMoney = this.ns.getServerMaxMoney(this.serverName);
    this.serverMaxMoney -= this.serverMaxMoney * 10 / 100;
  }
}

export { MoneyMaker };
