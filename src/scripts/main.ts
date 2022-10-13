import { NS } from 'Bitburner';

const SCRIPTS: { [key: string]: any } = {
  'scan-hack': {
    name: 'Scan Hack',
  },
};

enum SCRIPTS_TYPES {
  ScanHack = 'scan-hack',
}

/** @param {NS} ns */
export async function main(
  ns: NS,
) {
  const action: SCRIPTS_TYPES = ns.args[0] as SCRIPTS_TYPES;

  switch (action) {
    case SCRIPTS_TYPES.ScanHack:
      ns.toast(`Action "${action}" got executed`, 'success');
      ns.run('scripts/scanner.js', 1, 'true');
      break;

    default:
      ns.toast(`Unknown action "${action}"!`, 'error');
      break;
  }
}
