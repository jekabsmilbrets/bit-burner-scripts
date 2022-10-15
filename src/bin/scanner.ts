import { Scanner }                              from '/lib/oop/class/scanner.class';
import { sleepTime, hackingThreads, showToast } from '/lib/oop/constants/settings.constant';
import { hasArg }                               from '/lib/oop/utils/helper.util';
import { NS }                                   from 'Bitburner';


/** @param {NS} ns */
export async function main(
  ns: NS,
) {
  const crack: boolean = hasArg(ns.args, 0, false) as boolean;
  const hack: boolean = hasArg(ns.args, 1, false) as boolean;
  const propagate: boolean = hasArg(ns.args, 2, false) as boolean;
  const threads = hasArg(ns.args, 3, hackingThreads) as number;
  const toast = hasArg(ns.args, 4, showToast) as boolean;
  const _sleepTime = hasArg(ns.args, 5, sleepTime) as number;

  const scanner: Scanner = new Scanner(
    ns,
    crack,
    hack,
    propagate,
    threads,
    toast,
    _sleepTime,
  );

  return scanner.run();
}
