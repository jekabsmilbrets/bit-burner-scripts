import { NS } from 'Bitburner';

/** @param {NS} ns */
export async function main(ns: NS) {
  const serverName: string = ns.args[0] as string;

  if (!serverName) {
    ns.tprint(`No server name provided`);
    return;
  }

  await ns.hack(serverName);
}
