import { SCRIPTS } from '/lib/oop/constants/scripts.constant';
import { NS }      from 'Bitburner';

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

    await this.waitForCommand(
      command,
      pid,
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

  private async waitForCommand(
    command: string,
    pid: number,
  ): Promise<void> {
    const time = (new Date()).getTime();
    let isScriptRunning = true;

    while (isScriptRunning) {
      isScriptRunning = this.ns.isRunning(pid);

      if (!isScriptRunning) {
        const fTime = (new Date()).getTime();
        const message = `Finished command ${command} on server ${this.serverName} in ${(fTime - time) / 1000} seconds`;
        this.ns.print(message);

        if (this.toast) {
          this.ns.toast(message, 'success');
        }

        break;
      }

      await this.ns.sleep(this.sleepTime);
    }
  }

  private init(): void {
    this.ns.disableLog('disableLog');
    this.ns.disableLog('getHostname');
    this.ns.disableLog('getScriptRam');
    this.ns.disableLog('getServerMoneyAvailable');
    this.ns.disableLog('getServerSecurityLevel');
    this.ns.disableLog('getServerUsedRam');
    this.ns.disableLog('isRunning');
    this.ns.disableLog('print');
    this.ns.disableLog('run');
    this.ns.disableLog('sleep');
    this.ns.disableLog('toast');
    this.hostServer = this.ns.getHostname();
    this.hostServerMaxRam = this.ns.getServerMaxRam(this.hostServer);

    this.serverMinSecLvl = this.ns.getServerMinSecurityLevel(this.serverName) + 0.05;
    this.serverMaxMoney = this.ns.getServerMaxMoney(this.serverName);
    this.serverMaxMoney -= this.serverMaxMoney * 10 / 100;
  }
}

export { MoneyMaker };
