import { Cracker }              from '/lib/oop/class/cracker.class';
import { showToast, sleepTime } from '/lib/oop/constants/settings.constant';
import { hasArg }               from '/lib/oop/utils/helper.util';
import { NS }                   from 'Bitburner';


/** @param {NS} ns */
export async function main(
  ns: NS,
) {
  const serverName = hasArg(ns.args, 0) as string;
  const toast = hasArg(ns.args, 1, showToast) as boolean;
  const _sleepTime = hasArg(ns.args, 2, sleepTime) as number;

  const cracker = new Cracker(
    ns,
    serverName,
    toast,
    _sleepTime,
  );

  return cracker.run();
}
