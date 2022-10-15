import { EXECUTABLES }   from '/lib/oop/constants/executables.constant';
import { SCRIPTS_TYPES } from '/lib/oop/constants/script-types.constant';
import { NS }            from 'Bitburner';


/** @param {NS} ns */
export async function main(ns: NS) {
  const serverName: string = ns.args[0] as string;

  const fileDownloaded = await ns.wget(
    'http://localhost:9182/bin/utils/initRepo.js',
    EXECUTABLES.InitRepo,
    serverName,
  );

  if (fileDownloaded) {
    ns.exec(
      EXECUTABLES.InitRepo,
      serverName,
    );

    while (
      ns.isRunning(
        EXECUTABLES.InitRepo,
        serverName,
      )
      ) {
      await ns.sleep(100);
    }

    ns.exec(
      EXECUTABLES.Coordinator,
      serverName,
      1,
      SCRIPTS_TYPES.ScanCrackHackPropagate,
    );

    while (
      ns.isRunning(
        EXECUTABLES.Coordinator,
        serverName,
        '1',
        SCRIPTS_TYPES.ScanCrackHackPropagate,
      )
      ) {
      await ns.sleep(100);
    }
  }
}
