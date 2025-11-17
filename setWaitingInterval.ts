export const map = new Map<number, number>();

let waitingIntervalId = 0;

function getLastUntilOneLeft(arr: number[]): number {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }

  if (arr.length > 1) {
    const item = arr.pop()!;
    return item;
  }

  return arr[0];
}

/**
 * This function mimics the behavior of setInterval with one key difference:
 * if the callback function takes too long to execute or if the browser throttles,
 * subsequent calls to the callback function will not occur.
 *
 * Additionally, we pass an array of timeouts to define an increasing delay period.
 * For example, given the array [16, 8, 4, 2], the delays will be 2, 4, 8, 16, 16, 16...
 */
export function setWaitingInterval(
  handler: Function,
  timeouts: number[],
  ...args: any[]
): number {
  const currentWaitingIntervalId = ++waitingIntervalId;
  const timeoutsCopy = [...timeouts];

  function internalHandler(...argsInternal: any[]): void {
    handler(...argsInternal);

    if (!map.has(currentWaitingIntervalId)) {
      return;
    }

    const last = getLastUntilOneLeft(timeoutsCopy);

    map.set(
      currentWaitingIntervalId,
      setTimeout(internalHandler, last, ...args)
    );

    console.log("Called with ID:", currentWaitingIntervalId);
    console.log("Used timeout (ms):", last);
  }

  const last = getLastUntilOneLeft(timeoutsCopy);

  map.set(currentWaitingIntervalId, setTimeout(internalHandler, last, ...args));

  console.log("Called with ID:", currentWaitingIntervalId);
  console.log("Used timeout (ms):", last);

  return currentWaitingIntervalId;
}

export function clearWaitingInterval(intervalId: number): void {
  const realTimeoutId = map.get(intervalId);

  if (typeof realTimeoutId === "number") {
    clearTimeout(realTimeoutId);
    map.delete(intervalId);
  }
}
