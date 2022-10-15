import { EXECUTABLES }   from '/lib/oop/constants/executables.constant';
import { SCRIPTS_TYPES } from '/lib/oop/constants/script-types.constant';
import { hasArg }        from '/lib/oop/utils/helper.util';
import { NS }            from 'Bitburner';


/** @param {NS} ns */
export async function main(
  ns: NS,
) {
  const action: SCRIPTS_TYPES = hasArg(ns.args, 0) as SCRIPTS_TYPES;

  switch (action) {
    case SCRIPTS_TYPES.Scan:
      ns.run(EXECUTABLES.Scanner, 1);
      ns.toast(`Action "${action}" got executed`, 'success');
      break;

    case SCRIPTS_TYPES.ScanCrack:
      ns.run(EXECUTABLES.Scanner, 1, 'true');
      ns.toast(`Action "${action}" got executed`, 'success');
      break;

    case SCRIPTS_TYPES.ScanHack:
      ns.run(EXECUTABLES.Scanner, 1, 'false', 'true');
      ns.toast(`Action "${action}" got executed`, 'success');
      break;

    case SCRIPTS_TYPES.ScanCrackHack:
      ns.run(EXECUTABLES.Scanner, 1, 'true', 'true');
      ns.toast(`Action "${action}" got executed`, 'success');
      break;

    case SCRIPTS_TYPES.ScanCrackHackPropagate:
      ns.run(EXECUTABLES.Scanner, 1, 'true', 'true', 'true');
      ns.toast(`Action "${action}" got executed`, 'success');
      break;

    default:
      ns.toast(`Unknown action "${action}"!`, 'error');
      break;
  }
}
