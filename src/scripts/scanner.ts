import { NS } from 'Bitburner';

let ignoredServerNames = ['home'];
let hackedServerNames: string[] = [];

/** @param {NS} ns */
export async function main(
  ns: NS,
) {
  ns.disableLog('getServerRequiredHackingLevel');
  ns.disableLog('getHackingLevel');
  const hack: boolean = ns.args[0] as boolean ?? false;
  const hackerLevel: number = ns.getHackingLevel();

  ignoredServerNames = ['home'];
  hackedServerNames = [];

  await scanHack(ns, 'home', hackerLevel, hack);

  ns.tprint('Scan-Hacked initialized in servers (' + hackedServerNames.join(', ') + ')!');
}

/** @param {NS} ns
 * @param baseServerName
 * @param hackerLevel
 * @param hack
 */
async function scanHack(
  ns: NS,
  baseServerName: string,
  hackerLevel: number,
  hack: boolean = false,
) {
  const servers: string[] = ns.scan(baseServerName);

  for (const serverName of servers) {
    if (ignoredServerNames.includes(serverName)) {
      continue;
    }

    ignoredServerNames.push(serverName);

    ns.run('scripts/mini/crack.js', 1, serverName);

    await ns.sleep(500);

    const serverRequiredHackingLevel = ns.getServerRequiredHackingLevel(serverName);
    // TODO: const serverNumPortsRequired = ns.getServerNumPortsRequired(serverName);

    if (hackerLevel < serverRequiredHackingLevel) {
      ns.toast(`Can't hack server "${serverName}" your hacking lvl too low (${hackerLevel} < ${serverRequiredHackingLevel})!`, 'error');
      continue;
    }

    if (!ns.hasRootAccess(serverName)) {
      ns.toast(`Can't hack server "${serverName}" no root access!`, 'error');
      continue;
    }

    if (
      hack &&
      !ns.isRunning('scripts/hackServer.js', 'home', '3', serverName)
    ) {
      ns.run('scripts/hackServer.js', 1, serverName, '3');

      hackedServerNames.push(serverName);
    }

    await scanHack(ns, serverName, hackerLevel, hack);
  }
}
