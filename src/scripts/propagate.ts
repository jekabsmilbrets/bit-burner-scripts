import { EXECUTABLES }    from '/lib/oop/enums/executables.enum';
import { SCRIPTS_TYPES }  from '/lib/oop/enums/script-types.enum';
import { waitForCommand } from '/lib/oop/utils/helper.util';
import { NS }             from 'Bitburner';


/** @param {NS} ns */
export async function main(ns: NS) {
  const serverName: string = ns.args[0] as string;
  let pid;

  ns.killall(serverName, true);

  if (!ns.fileExists('/bin/utils/initRepo.js', serverName)) {
    const fileDownloaded = await ns.wget(
      'http://localhost:9182/bin/utils/initRepo.js',
      EXECUTABLES.InitRepo,
      serverName,
    );

    if (fileDownloaded) {
      pid = ns.exec(
        EXECUTABLES.InitRepo,
        serverName,
      );

      await waitForCommand(
        ns,
        serverName,
        `exec ${EXECUTABLES.InitRepo}`,
        pid,
        100,
        false,
      );
    }
  } else {
    pid = ns.exec(
      EXECUTABLES.Pull,
      serverName,
    );

    await waitForCommand(
      ns,
      serverName,
      `exec ${EXECUTABLES.Pull}`,
      pid,
      100,
      false,
    );
  }

  pid = ns.exec(
    EXECUTABLES.Coordinator,
    serverName,
    1,
    SCRIPTS_TYPES.ScanCrackHackPropagate,
  );

  await waitForCommand(
    ns,
    serverName,
    `exec ${EXECUTABLES.Coordinator} 1 ${SCRIPTS_TYPES.ScanCrackHackPropagate}`,
    pid,
    100,
    false,
  );
}
