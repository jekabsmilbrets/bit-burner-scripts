import { NS } from 'Bitburner';


class Cracker {
  constructor(
    private ns: NS,
    private serverName: string,
    private toast: boolean = true,
    private sleepTime: number = 500,
  ) {
    this.init();
  }

  public async run(): Promise<void> {
    await this.NUKE();
    await this.BruteSSH();
    await this.FTPCrack();
    await this.relaySMTP();
    await this.HTTPWorm();
    await this.SQLInject();
  }

  private async NUKE(): Promise<void> {
    try {
      if (this.ns.fileExists('NUKE.exe', 'home')) {
        this.ns.nuke(this.serverName);
        if (this.toast) {
          this.ns.toast(`Executed NUKE.exe on ${this.serverName}!`);
        }
        await this.ns.sleep(this.sleepTime);
      }
    }
    catch {
      if (this.toast) {
        this.ns.toast(`Failed to executed NUKE.exe on ${this.serverName}!`, 'error');
      }
    }
  }

  private async BruteSSH(): Promise<void> {
    try {
      if (this.ns.fileExists('BruteSSH.exe', 'home')) {
        this.ns.brutessh(this.serverName);
        if (this.toast) {
          this.ns.toast(`Executed BruteSSH.exe on ${this.serverName}!`);
        }
        await this.ns.sleep(this.sleepTime);
      }
    }
    catch {
      if (this.toast) {
        this.ns.toast(`Failed to executed BruteSSH.exe on ${this.serverName}!`, 'error');
      }
    }
  }

  private async FTPCrack(): Promise<void> {
    try {
      if (this.ns.fileExists('FTPCrack.exe', 'home')) {
        this.ns.ftpcrack(this.serverName);
        if (this.toast) {
          this.ns.toast(`Executed FTPCrack.exe on ${this.serverName}!`);
        }
        await this.ns.sleep(this.sleepTime);
      }
    }
    catch {
      if (this.toast) {
        this.ns.toast(`Failed to executed FTPCrack.exe on ${this.serverName}!`, 'error');
      }
    }
  }

  private async relaySMTP(): Promise<void> {
    try {
      if (this.ns.fileExists('relaySMTP.exe', 'home')) {
        this.ns.relaysmtp(this.serverName);
        if (this.toast) {
          this.ns.toast(`Executed relaySMTP.exe on ${this.serverName}!`);
        }
        await this.ns.sleep(this.sleepTime);
      }
    }
    catch {
      if (this.toast) {
        this.ns.toast(`Failed to executed relaySMTP.exe on ${this.serverName}!`, 'error');
      }
    }
  }

  private async HTTPWorm(): Promise<void> {
    try {
      if (this.ns.fileExists('HTTPWorm.exe', 'home')) {
        this.ns.httpworm(this.serverName);
        if (this.toast) {
          this.ns.toast(`Executed HTTPWorm.exe on ${this.serverName}!`);
        }
        await this.ns.sleep(this.sleepTime);
      }
    }
    catch {
      if (this.toast) {
        this.ns.toast(`Failed to executed HTTPWorm.exe on ${this.serverName}!`, 'error');
      }
    }
  }

  private async SQLInject(): Promise<void> {
    try {
      if (this.ns.fileExists('SQLInject.exe', 'home')) {
        this.ns.sqlinject(this.serverName);
        if (this.toast) {
          this.ns.toast(`Executed SQLInject.exe on ${this.serverName}!`);
        }
        await this.ns.sleep(this.sleepTime);
      }
    }
    catch {
      if (this.toast) {
        this.ns.toast(`Failed to executed SQLInject.exe on ${this.serverName}!`, 'error');
      }
    }
  }

  private init(): void {
    this.ns.disableLog('brutessh');
    this.ns.disableLog('disableLog');
    this.ns.disableLog('fileExists');
    this.ns.disableLog('ftpcrack');
    this.ns.disableLog('httpworm');
    this.ns.disableLog('nuke');
    this.ns.disableLog('relaysmtp');
    this.ns.disableLog('sleep');
    this.ns.disableLog('sqlinject');
    this.ns.disableLog('toast');
  }
}

export { Cracker };
