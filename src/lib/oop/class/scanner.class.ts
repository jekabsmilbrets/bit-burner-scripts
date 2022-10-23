import { Port }                        from '/lib/oop/class/port.class';
import { EXECUTABLES }                 from '/lib/oop/enums/executables.enum';
import { Ports }                       from '/lib/oop/enums/ports.enum';
import { SCRIPTS }                     from '/lib/oop/enums/scripts.enum';
import { waitForCommand, disableLogs } from '/lib/oop/utils/helper.util';
import { NS }                          from 'Bitburner';


class Scanner {
  private hostServer!: string;
  private ignoredServerNames: string[] = ['home'];
  private crackedServerNames: string[] = [];
  private hackedServerNames: string[] = [];
  private propagatedServerNames: string[] = ['home'];
  private serverNames: string[] = [];
  private hackerLevel: number = 0;
  private port!: Port;

  constructor(
    private ns: NS,
    private doCrack: boolean = false,
    private doHack: boolean = false,
    private doPropagate: boolean = false,
    private hackingThreads: number = 1,
    private toast: boolean = true,
    private sleepTime: number = 500,
  ) {
    this.init();
  }

  public async run(): Promise<void> {
    this.ns.killall(this.hostServer);

    if (await this.scan()) {
      this.ns.tprint(`[${this.hostServer}] Scanned servers ${this.serverNames.join(', ')}!`);
    }

    if (this.doCrack) {
      if (await this.crack()) {
        this.ns.tprint(`[${this.hostServer}] Cracking done in servers (${this.crackedServerNames.join(', ')})!`);
      }
    }

    if (this.doPropagate) {
      if (await this.propagate()) {
        this.ns.tprint(`[${this.hostServer}] Propagate initialized in servers (${this.propagatedServerNames.join(', ')})!`);
      }
    }

    if (this.doHack) {
      if (await this.hack()) {
        this.ns.tprint(`[${this.hostServer}] Hacking initialized in servers (${this.hackedServerNames.join(', ')})!`);
      }
    }
  }

  private async scan(): Promise<boolean> {
    const serversToScan = [...this.serverNames];

    for (const serverName of serversToScan) {
      const foundServerNames = this.ns.scan(serverName)
                                   .filter(
                                     (fServerName: string) =>
                                       !this.serverNames.includes(fServerName) &&
                                       !this.ignoredServerNames.includes(fServerName) &&
                                       this.ns.serverExists(fServerName),
                                   );

      if (foundServerNames.length > 0) {
        this.serverNames = [
          ...new Set(
            [
              ...this.serverNames,
              ...foundServerNames,
            ],
          ),
        ];

        await this.ns.sleep(this.sleepTime);
      } else {
        break;
      }
    }

    return true;
  }

  private async crack(): Promise<boolean> {
    for (const serverName of this.serverNames) {
      const pid = this.ns.run(
        EXECUTABLES.Cracker,
        1,
        serverName,
      );

      await waitForCommand(
        this.ns,
        serverName,
        'run cracks',
        pid,
        this.sleepTime,
        this.toast,
      );

      this.crackedServerNames.push(serverName);
    }

    return true;
  }

  private async hack(): Promise<boolean> {
    for (const serverName of this.serverNames) {
      const serverRequiredHackingLevel = this.ns.getServerRequiredHackingLevel(serverName);
      // TODO: const serverNumPortsRequired = ns.getServerNumPortsRequired(serverName);

      if (this.hackerLevel < serverRequiredHackingLevel) {
        this.ns.toast(
          `Can't hack server "${serverName}" your hacking lvl too low (${this.hackerLevel} < ${serverRequiredHackingLevel})!`,
          'error',
        );
        continue;
      }

      if (!this.ns.hasRootAccess(serverName)) {
        this.ns.toast(
          `Can't hack server "${serverName}" no root access!`,
          'error',
        );
        continue;
      }

      const isScriptRunning = this.ns.isRunning(
        EXECUTABLES.ServerHacker,
        this.hostServer,
        '1',
        serverName,
      );

      if (
        !isScriptRunning
      ) {
        this.ns.run(
          EXECUTABLES.ServerHacker,
          1,
          serverName,
          this.hackingThreads.toString(),
        );

        this.hackedServerNames.push(serverName);
      }
    }

    return true;
  }

  private async propagate(): Promise<boolean> {
    const portHandler = this.port.getPort(Ports.Propagate);

    const getPropagatedServers = (method: 'read' | 'peek') => {
      const action = (method): string => method === 'read' ? portHandler.read() as string : portHandler.peek() as string;

      return !portHandler.empty() ? action(method).split(',') : [];
    };

    for (const serverName of this.serverNames) {
      let propagatedServers = getPropagatedServers('peek');

      if (propagatedServers.includes(serverName)) {
        continue;
      }

      const isScriptRunning = this.ns.isRunning(
        SCRIPTS.Propagate,
        this.hostServer,
        '1',
        serverName,
      );

      if (
        !isScriptRunning
      ) {
        this.ns.run(
          SCRIPTS.Propagate,
          1,
          serverName,
        );

        this.propagatedServerNames.push(serverName);

        propagatedServers = getPropagatedServers('read');
        propagatedServers = [
          ...new Set(
            [
              ...propagatedServers,
              ...this.propagatedServerNames,
            ],
          ),
        ];

        portHandler.write(propagatedServers.join(','));
      }
    }

    return true;
  }

  private init(): void {
    disableLogs(
      this.ns,
      [
        'disableLog',
        'getHackingLevel',
        'getHostname',
        'getServerRequiredHackingLevel',
        'hasRootAccess',
        'isRunning',
        'run',
        'serverExists',
        'sleep',
        'toast',
      ],
    );

    this.hostServer = this.ns.getHostname();
    this.ignoredServerNames.push(this.hostServer);
    this.hackerLevel = this.ns.getHackingLevel();
    this.port = new Port(this.ns);

    this.serverNames = this.ns.scan(this.hostServer)
                           .filter(
                             (serverName: string) => !this.ignoredServerNames.includes(serverName),
                           );
  }
}

export { Scanner };
