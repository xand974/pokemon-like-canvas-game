import {executePromisesSync, oc} from './utils_module';
import {KeysOfType} from './types';

export const unbox = <T>([x]: [T]): T => x;

export const insertBetweenArray = <T>(array: Array<T>, item: T) => {
  if (array.length < 2) return array;
  let i = array.length - 1;
  do {
    array.splice(i, 0, item)
  } while (i-- > 1);
  return array
};

export const replaceItemsInArray = <T>(targetArray: Array<T>, newItems: Array<T>) => {
  targetArray.length = 0;
  targetArray.push(...newItems);
  return targetArray;
};
export const findFirst = <T>(array: Array<T>, predicate: (x: T) => boolean, fallback?: T): T | undefined => {
  for (let i = 0; i < array.length; i++) if (predicate(array[i])) return array[i];
  return fallback;
};

export const findFirstIndex = <T>(array: Array<T>, predicate: (x: T) => boolean) => {
  for (let i = 0; i < array.length; i++) if (predicate(array[i])) return i
};

export const removeConsecutiveItemsFromArray = <T>(array: Array<T>, predicateAreSameFn: (a: T, b: T) => boolean) => array.filter((item, i) => i === 0 || !oc(() => predicateAreSameFn(array[i - 1], item)));

export const removeWhile = <T>(array: Array<T>, predicate: (x: T) => boolean) => {
  for (let i = 0; i < array.length; i++)
    if (!predicate(array[i])) return array.slice(i);
  return [];
};

export const removeWhileRight = <T>(array: Array<T>, predicate: (x: T) => boolean) => removeWhile(array.reverse(), predicate).reverse();

export const trimArray = <T>(array: Array<T>, predicate: (x: T) => boolean) => removeWhile(removeWhileRight(array, predicate), predicate);

export const removeOneFromArray = <T>(array: Array<T>, predicate: (x: T) => boolean) => replaceOneInArray(array, predicate);

export const replaceOneInArray = <T>(array: Array<T>, predicate: (x: T) => boolean, ...newItems: Array<T>) => {
  for (let i = 0; i < array.length; i++) if (predicate(array[i])) return array.splice(i, 1, ...newItems), array;
  return array;
};

export const removeFromArray = <T>(arr: Array<T>, item: T, {onlyFirst = false} = {}) => {
  for (let i = arr.length; i--;) {
    if (arr[i] === item) {
      arr.splice(i, 1);
      if (onlyFirst) return;
    }
  }
};

export const getLast = <T>(array: T[]): T | undefined => array[array.length - 1];

export const uniqueArray = <T>(array: T[]) => [...new Set(array)];

export const wrapToArray = <T>(item: T | T[]) => Array.isArray(item) ? item : [item];

export function arraySwap<T>(array: T[], i: number, j: number) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}


export function arrayMoveItem<T>(array: T[], from: number, to: number) {
  array.splice(to, 0, array.splice(from, 1)[0]);
  return array;
}

export async function filterAsync<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<boolean>, {
  executeSynchronously = false
} = {}): Promise<T[]> {
  const filterHash = await (executeSynchronously ?
    executePromisesSync(array.map((x, i, a) => () => callback(x, i, a))) :    // sync. execution (one by one)
    Promise.all(array.map(callback)));
  return array.filter((value, index) => filterHash[index]);
}
