import { NS } from 'Bitburner';

async function waitForCommand(
  ns: NS,
  serverName: string,
  command: string,
  pid: number,
  sleepTime: number = 500,
  toast: boolean = false,
): Promise<void> {
  const time = (new Date()).getTime();
  let isScriptRunning = true;

  while (isScriptRunning) {
    isScriptRunning = ns.isRunning(pid);

    if (!isScriptRunning) {
      const fTime = (new Date()).getTime();
      const message = `Finished command ${command} on server ${serverName} in ${(fTime - time) / 1000} seconds`;
      ns.print(message);

      if (toast) {
        ns.toast(message, 'success');
      }

      break;
    }

    await ns.sleep(sleepTime);
  }
}

function hasArg(
  args: (string | number | boolean)[],
  index: number,
  defaultValue: string | number | boolean | undefined = undefined,
): string | number | boolean | undefined {
  if (args && args.length >= index + 1) {
    return args[index];
  }

  return defaultValue;
}

function disableLogs(
  ns: NS,
  fns: string[],
): void {
  fns.forEach(
    (fn: string) => {
      ns.print(`Disabling logs for ${fn}`);
      ns.disableLog(fn);
    },
  );
}

async function dynamicAsyncMethodCall(
  self: any,
  method: string,
  args?: any | any[],
): Promise<any> {
  if (args) {
    if (Array.isArray(args)) {
      return self[method](...args);
    }

    return self[method](args);
  }

  return self[method]();
}

export { waitForCommand, hasArg, disableLogs, dynamicAsyncMethodCall };
