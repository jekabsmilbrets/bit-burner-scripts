import { NS } from 'Bitburner';

const ignoredServerNames = ['home'];

/** @param {NS} ns */
export async function main(
  ns: NS,
) {
  ns.disableLog('getServerRequiredHackingLevel');
  ns.disableLog('getHackingLevel');
  const hack: boolean = ns.args[0] as boolean ?? false;
  const hackerLevel: number = ns.getHackingLevel();

  await scanHack(ns, 'home', hackerLevel, hack);

  ns.tprint('Scan-Hacked initialized in servers (' + ignoredServerNames.join(', ') + ')!');
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

    const serverRequiredHackingLevel = ns.getServerRequiredHackingLevel(serverName);
    // TODO: const serverNumPortsRequired = ns.getServerNumPortsRequired(serverName);
    await ns.sleep(100);

    if (hackerLevel < serverRequiredHackingLevel) {
      ns.toast(`Can't hack server "${serverName}" your hacking lvl too low (${hackerLevel} < ${serverRequiredHackingLevel})!`, 'error');
      continue;
    }

    ignoredServerNames.push(serverName);

    if (
      hack &&
      !ns.isRunning('scripts/hackServer.js', 'home', '2', serverName)
    ) {
      ns.run('scripts/hackServer.js', 1, serverName, '2');
    }

    await scanHack(ns, serverName, hackerLevel, hack);
  }
}
