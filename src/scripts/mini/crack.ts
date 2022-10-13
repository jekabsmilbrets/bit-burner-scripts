import { NS } from 'Bitburner';

/** @param {NS} ns */
export async function main(
  ns: NS,
) {
  const serverName: string = ns.args[0] as string;

  try {
    if (ns.fileExists('NUKE.exe', 'home')) {
      ns.nuke(serverName);
      ns.toast(`Executed NUKE.exe on ${serverName}!`);
    }
  }
  catch {
    ns.toast(`Failed to executed NUKE.exe on ${serverName}!`, 'error');
  }

  try {
    if (ns.fileExists('BruteSSH.exe', 'home')) {
      ns.brutessh(serverName);
      ns.toast(`Executed BruteSSH.exe on ${serverName}!`);
    }
  }
  catch {
    ns.toast(`Failed to executed BruteSSH.exe on ${serverName}!`, 'error');
  }

  try {
    if (ns.fileExists('FTPCrack.exe', 'home')) {
      ns.ftpcrack(serverName);
      ns.toast(`Executed FTPCrack.exe on ${serverName}!`);
    }
  }
  catch {
    ns.toast(`Failed to executed FTPCrack.exe on ${serverName}!`, 'error');
  }

  try {
    if (ns.fileExists('relaySMTP.exe', 'home')) {
      ns.relaysmtp(serverName);
      ns.toast(`Executed relaySMTP.exe on ${serverName}!`);
    }
  }
  catch {
    ns.toast(`Failed to executed relaySMTP.exe on ${serverName}!`, 'error');
  }

  try {
    if (ns.fileExists('HTTPWorm.exe', 'home')) {
      ns.httpworm(serverName);
      ns.toast(`Executed HTTPWorm.exe on ${serverName}!`);
    }
  }
  catch {
    ns.toast(`Failed to executed HTTPWorm.exe on ${serverName}!`, 'error');
  }

  try {
    if (ns.fileExists('SQLInject.exe', 'home')) {
      ns.sqlinject(serverName);
      ns.toast(`Executed SQLInject.exe on ${serverName}!`);
    }
  }
  catch {
    ns.toast(`Failed to executed SQLInject.exe on ${serverName}!`, 'error');
  }
}
