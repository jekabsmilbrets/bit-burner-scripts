import { RepoInit } from '/lib/Helpers';
import { NS }       from 'Bitburner';


/** @param {NS} ns */
export async function main(ns: NS) {
  const initRepo = new RepoInit(ns);

  return initRepo.pullScripts();
}
