import { MoneyMaker }                           from '/lib/oop/class/money-maker.class';
import { showToast, sleepTime, hackingThreads } from '/lib/oop/constants/settings.constant';
import { hasArg }                               from '/lib/oop/utils/helper.util';
import { NS }                                   from 'Bitburner';


/** @param {NS} ns */
export async function main(
  ns: NS,
) {
  const serverName = hasArg(ns.args, 0) as string;
  const threads = hasArg(ns.args, 1, hackingThreads) as number;
  const toast = hasArg(ns.args, 2, showToast) as boolean;
  const _sleepTime = hasArg(ns.args, 3, sleepTime) as number;

  if (!serverName) {
    ns.tprint(`No server name provided`);
    return;
  }

  const moneyMaker: MoneyMaker = new MoneyMaker(
    ns,
    serverName,
    threads,
    toast,
    _sleepTime,
  );

  return moneyMaker.run();
}
