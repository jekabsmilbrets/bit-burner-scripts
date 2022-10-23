import { disableLogs, dynamicAsyncMethodCall } from '/lib/oop/utils/helper.util';
import { NS }                                  from 'Bitburner';


class Cracker {
  private methods: string[] = [
    'NUKE',
    'BruteSSH',
    'FTPCrack',
    'relaySMTP',
    'HTTPWorm',
    'SQLInject',
  ];

  private successfulCracks = 0;

  constructor(
    private ns: NS,
    private serverName: string,
    private toast: boolean = true,
    private sleepTime: number = 500,
  ) {
    this.init();
  }

  public async run(): Promise<void> {
    for (const method of this.methods) {
      if ((await dynamicAsyncMethodCall(this, method)) === true) {
        this.successfulCracks++;
      }
    }

    if (this.successfulCracks === this.methods.length) {
      this.ns.toast(`All Cracks (${this.methods.join(', ')}) executed on ${this.serverName}!`);
    }
  }

  private async NUKE(): Promise<boolean> {
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

      return false;
    }

    return true;
  }

  private async BruteSSH(): Promise<boolean> {
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

      return false;
    }

    return true;
  }

  private async FTPCrack(): Promise<boolean> {
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

      return false;
    }

    return true;
  }

  private async relaySMTP(): Promise<boolean> {
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

      return false;
    }

    return true;
  }

  private async HTTPWorm(): Promise<boolean> {
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

      return false;
    }

    return true;
  }

  private async SQLInject(): Promise<boolean> {
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

      return false;
    }

    return true;
  }

  private init(): void {
    disableLogs(
      this.ns,
      [
        'disableLog',
        'brutessh',
        'fileExists',
        'ftpcrack',
        'httpworm',
        'nuke',
        'relaysmtp',
        'sleep',
        'sqlinject',
        'toast',
      ],
    );
  }
}

export { Cracker };
