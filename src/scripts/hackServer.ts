import { NS } from 'Bitburner';

/** @param {NS} ns */
export async function main(
  ns: NS,
) {
  ns.disableLog('sleep');
  ns.disableLog('getServerMinSecurityLevel');
  ns.disableLog('getServerMaxMoney');
  ns.disableLog('getServerSecurityLevel');
  ns.disableLog('getServerMoneyAvailable');
  ns.disableLog('run');
  ns.disableLog('isRunning');
  const serverName: string = ns.args[0] as string;
  const threads = (ns.args[1] ?? 1) as number;

  if (!serverName) {
    ns.tprint(`No server name provided`);
    return;
  }

  const serverMinSecLvl = ns.getServerMinSecurityLevel(serverName) + 0.05;
  let serverMaxMoney = ns.getServerMaxMoney(serverName);
  serverMaxMoney -= serverMaxMoney * 10 / 100;

  while (true) {
    const currentServerSecLvl = ns.getServerSecurityLevel(serverName);
    const currentServerMoney = ns.getServerMoneyAvailable(serverName);

    await hackServer(ns, serverName, serverMinSecLvl, serverMaxMoney, currentServerSecLvl, currentServerMoney, threads);
    await ns.sleep(500);
  }
}

/** @param {NS} ns
 * @param serverName
 * @param serverMinSecLvl
 * @param serverMaxMoney
 * @param currentServerSecLvl
 * @param currentServerMoney
 * @param threads
 */
async function hackServer(
  ns: NS,
  serverName: string,
  serverMinSecLvl: number,
  serverMaxMoney: number,
  currentServerSecLvl: number,
  currentServerMoney: number,
  threads: number,
) {
  let script: string;
  let command: string;

  switch (true) {
    case currentServerSecLvl > serverMinSecLvl:
      ns.print(`Weakening ${serverName} current ${currentServerSecLvl} max ${serverMinSecLvl}`);

      script = 'scripts/mini/weaken.js';
      command = 'weaken';
      break;

    case currentServerMoney < serverMaxMoney:
      ns.print(`Growing ${serverName} current ${currentServerMoney} max ${serverMaxMoney}`);

      script = 'scripts/mini/grow.js';
      command = 'grow';
      break;

    default:
      ns.print(`Hacking ${serverName}`);

      script = 'scripts/mini/hack.js';
      command = 'hack';
      break;
  }

  const pid = ns.run(
    script,
    threads,
    serverName,
  );

  let time = (new Date()).getTime();

  let isScriptRunning = true;

  while (isScriptRunning) {
    isScriptRunning = ns.isRunning(pid);

    await ns.sleep(500);

    if (!isScriptRunning) {
      let ftime = (new Date()).getTime();
      ns.print(`Finished command ${command} on server ${serverName} in ${(ftime - time) / 1000} seconds`);
      ns.toast(`Finished command ${command} on server ${serverName} in ${(ftime - time) / 1000} seconds`, 'success');
      return true;
    }
  }
}
