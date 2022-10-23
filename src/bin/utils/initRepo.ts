import { disableLogging } from '/lib/oop/constants/settings.constant';
import { NS }             from 'Bitburner';


const params = {
  baseUrl: 'http://localhost:9182/',
  manifest: {
    sourceFile: 'resources/manifest.txt',
    destFile: '/resources/manifest.txt',
  },
  helpers: {
    sourceFile: 'lib/Helpers.js',
    destFile: '/lib/Helpers.js',
  },
  pullFiles: {
    sourceFile: 'bin/utils/pullFiles.js',
    destFile: '/bin/utils/pullFiles.js',
  },
};

async function pullFile(
  ns: NS,
  file: { sourceFile: string; destFile: string },
) {
  const manifestUrl = `${params.baseUrl}${file.sourceFile}`;
  if (!disableLogging) {
    ns.tprintf(
      `[${ns.getHostname()}] INFO   > Downloading ${manifestUrl} -> ${file.destFile}`,
    );
  }

  if (!(await ns.wget(manifestUrl, file.destFile))) {
    if (!disableLogging) {
      ns.tprintf(`[${ns.getHostname()}] ERROR  > ${manifestUrl} -> ${file.destFile} failed.`);
    }
    ns.exit();
  }
}

/** @param {NS} ns **/
export async function main(ns: NS) {
  const files = [
    params.helpers,
    params.manifest,
    params.pullFiles,
  ];

  for (let file of files) {
    await pullFile(ns, file);
  }

  if (!disableLogging) {
    ns.tprintf(`[${ns.getHostname()}] INFO   > Successfully pulled initial files!`);
    ns.tprintf(`[${ns.getHostname()}] INFO   > Running download script...`);
  }
  await ns.sleep(250);
  ns.run(params.pullFiles.destFile);
}
