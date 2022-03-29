import {AnyObject, AsyncWork, Falsy, NumericObject} from './types';

export const noop = (...x: any) => {};
export const noopAsync = async (...x: any) => {};
export const nope = (...x: any): boolean => false;
export const nothing = (...x: any) => {return undefined};
export const orEmpty = (item?: object) => item || {};
export const prop = <P extends keyof T, T>(key: P, obj?: T): undefined | T[P] => obj && obj[key];
export const negateFn = (fn: Function) => (...params: any[]) => !fn(...params);
export const negateAsyncFn = (fn: Function) => async (...params: any[]) => !(await fn(...params));
export const oc = <T>(fn: () => T, defaultValue?: T) => { try { return fn(); } catch(e) { return defaultValue } };
export const throwEx = (name: string): any => {throw Error(name)};
export const tryExpression = (fn: Function, catchFn = noop) => { try { return fn(); } catch(e) { return catchFn(e) } };
export const and = (...functions: Function[]) => (...params: any[]) => functions.every(fn => fn.apply(null, params));
export const andAsync = (...functions: Function[]) => async (...params: any[]) => (await Promise.all(functions.map(fn => fn(...params)))).every(isTrue);
export const orAsync = (...functions: Function[]) => async (...params: any[]) => (await Promise.all(functions.map(fn => fn(...params)))).some(isTrue);
// export const wrapVoid = (fn: Function) => (...args: any[]) => {fn(args)};
// export const wrapFn = (fn: Function) => (x: any[]) => void fn();

// this fixes TS issues with Object.entries method:
export const objectEntries = Object.entries as <T>(o: T) => [Extract<keyof T, string>, T[keyof T]][];

export const isUndefined = (value: any): value is undefined => typeof value === 'undefined';
export const isString = (value: any): value is string => typeof value === 'string';
export const isObject = (value: any): value is object => value !== null && typeof value === 'object';
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';
export const isFunction = (fn: any): fn is Function => typeof fn === 'function';
export const isNumeric = (value: any): value is number | string => !isNaN(value - parseFloat(value));    // https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
// @ts-ignore - the "parseFloat(value)" requires string but we use it to fix "null" as well; returns false for NaN, Infinity
export const isNumber = (value: number | undefined | null): value is number => isNumeric(value);
// returns false also for strings!
export const isStrictNumber = (value: number | string | undefined | null): value is number => !isString(value) && isNumber(value);

export const isDefined = <T>(value: any): value is T => !isUndefined(value);
export const isBlank = (str: string) => (!str || /^\s*$/.test(str));

export const printNumber = (number: number) => `${Object.is(number, -0) ? '-' : ''}${number}`;    // can print negative zero
export const getTime = () => Date.now();
export const isStillValid = (dateTime: number, validDuration: number) => getTime() < dateTime + validDuration;

export const secondsToMs = (seconds: number) => seconds * 1000;
export const minutesToMs = (minutes: number) => minutes * 60000;
export const hoursToMs = (hours: number) => hours * 3600000;
export const daysToMs = (days: number) => days * 86400000;

export const isTrue = <T>(x?: T) => x;
export const isTruthy = <T>(x: T | Falsy): x is T => !!x;

export const execute = <T>(fn: Function): T => fn();
export const executeAllAndClear = (array: Function[], params = []) => { let fn; while ((fn = array.pop())) fn.apply(null, params); };
export const subtractObjects = (oA: NumericObject, oB: NumericObject) => Object.keys(oA).reduce((acc, key) => (acc[key] = oA[key] - oB[key], acc), {} as NumericObject);
export const px = (pixels: number) => `${pixels}px`;
export const percent = (percent: number) => `${percent}%`;
export const quote = (item: string | number) => `"${item}"`;

export const copyObject = <T extends {}>(objToClone: T) => Object.assign({}, objToClone);
export const copyObjectDeepAsync = <T>(obj: T): Promise<T> => new Promise(resolve => { const {port1, port2} = new MessageChannel(); port2.onmessage = ev => resolve(ev.data); port1.postMessage(obj); });
export const mapToObject = <T>(map: Map<string, T>) => [...map.entries()].reduce((acc, [key, value]) => (acc[key] = value, acc), {} as AnyObject);

export const isInIframe = () => { try { return window.self !== window.top } catch (e) { return true } };
// based on the real life experiments!

// events:
export const onlyMeEventHandler = (fn: Function) => (e: Event) => {e.preventDefault(); e.stopImmediatePropagation(); fn(e); };

export function substring(input: string, strStart: string, strEnd?: string, useFullLengthInCaseEndNotFound?: boolean) {
  let x = 0, z = 0, y = input.length;
  if (strStart) x = (z = input.indexOf(strStart)) + strStart.length;
  if (strEnd) y = input.indexOf(strEnd, x);
  if (y < 0 && useFullLengthInCaseEndNotFound) y = input.length;
  return y < 0 || z < 0 ? '' : input.substring(x, y);
}

export const getNameVersion = () => {const m = browser.runtime.getManifest(); return `${m.name} ${m.version}`};

export const errorToString = (message: string, error: Error) => `${message}: ${isObject(error) ? `${error.name}\n${error.message}\n${error.stack}\n${error}` : 'N/A'}`;

export const rejectedPromise = (errorMessage: string) => Promise.reject(Error(errorMessage));
export const sideEffectHandler = <T>(fn: (item: T) => void) => ((item: T) => { fn(item); return item; });   // returns new one-param function that will call the side-effect function and then return original value; Useful for `.map` or `.then` functions.
export const sideEffectPromiseHandler = <T>(fn: Function) => ((item: T) => fn(item).then(() => item));
export const sideEffectRejectHandler = (fn: Function) => ((err: Error) => (fn(err), Promise.reject(err)));

// const stackTrace = () => new Error().stack;
// const makeDirty = obj => obj.__isDirty = getTime();
export const sumArray = (items: number[]) => { let result = 0; for (let i = 0; i < items.length; i++) result += items[i]; return result };
export const sum = (...items: number[]) => sumArray(items);
export const removeFromObject = (obj: AnyObject, ...keys: string[]) => keys.forEach(key => delete obj[key]);

export const randomItem = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];
export const randomNumber = (to: number) => Math.floor(Math.random() * to);

export const floor2 = (x: number) => Math.floor(x * 100) / 100;

export const timeoutPromise = (delay?: number) => new Promise(resolve => setTimeout(resolve, delay));

type PromiseFactory<T, ERR = unknown> = [Promise<T>, (x?: T) => Promise<ERR> | void, (err: Error) => Promise<ERR> | void];
export const promiseFactory = <T, ERR = unknown>(): PromiseFactory<T, ERR> => { const result: any[] = []; result.splice(0, 0, new Promise((resolve, reject) => {result.push(resolve, reject)})); return result as PromiseFactory<T, ERR> };   // returns [promise, resolve, reject]

export const extractHexColor = (node: HTMLElement) => ((window.getComputedStyle(node).backgroundColor || '').match(/[0-9]+/g) || ['0','0','0','0']).slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
export const extractHoursMinutesSeconds = (seconds: number) => seconds ? [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), (seconds % 60)] : [0, 0, 0];

export const mapGetAndRemove = <T, U>(map: Map<T, U>, key: T) => { const result = map.get(key); map.delete(key); return result; };

export const getParentAtLevel = (node: HTMLElement, parentLevelCount: number) => { for (let i = 0; i < parentLevelCount; i++) {node = node.parentElement || node} return node; };

// @ts-ignore   // all of my projects has defined background.html page, so this will never fail
export const isRunningInBackground = () => $IS_WEB ? false : $IS_FIREFOX ? window.location.href === browser.runtime.getManifest().background.page : window.location.pathname === `/${browser.runtime.getManifest().background.page}`;

export const closeCurrentTab = () => browser.tabs.getCurrent().then(tab => browser.tabs.remove(tab.id!));
export const reloadCurrentTab = () => browser.tabs.getCurrent().then(tab => browser.tabs.reload(tab.id!));
export const queryTabInfo = () => Promise.all([browser.tabs.getCurrent(), browser.windows && browser.windows.getCurrent()]);
// export const sendMessageToCurrentTab = (message: any) => browser.tabs.query({currentWindow: true, active: true}).then(tabs => sendTabMessage(tabs[0].id!, message));
export const getActiveTab = () => browser.tabs.query({active: true, lastFocusedWindow: true}).then(([tab]) => tab);
export const getCurrentTabId = () => browser.tabs.getCurrent().then(tab => tab.id!);
export const reloadAddonAndTab = async () => { browser.tabs.reload((await getActiveTab()).id); browser.runtime.reload(); };    // used for development
// if user has only one tab opened, we won't close it but instead redirect somewhere else (used in Options page)
export const closeOrUpdateCurrentTab = async (alternativeURL: string) => {
  const tabs = await browser.tabs.query({});
  const tabId = (await getActiveTab()).id!;
  if (tabs.length === 1) await browser.tabs.update(tabId, {url: alternativeURL});
  else await browser.tabs.remove(tabId);
};


// --------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------- //
// -------------------------------------------- FACTORIES -------------------------------------------- //

export const OneTimeFactory = (fn: (...args: any[]) => void) => {
  let IS_OVER = false;
  return function (...args: any[]) {
    if (IS_OVER) return;              // make sure we cannot call this twice!
    IS_OVER = true;
    fn(...args)
  };
};

// Takes a function that can be evaluated only once. Returned function can be called multiple times, first calls the passed function, every other call will return the previous value.
export const LazyValFunction = <T>(fn: (...x: any[]) => T) => {
  let IS_OVER = false, result: T;
  return (...params: any[]): T => {
    if (IS_OVER) return result;
    IS_OVER = true;
    return result = fn(...params)
  };
};

interface ExecutePromisesSyncOptions<T> {
  beforeEach?: (i: number) => void | Promise<void>,
  afterEach?: (i: number, item: ExecSyncResult<T>) => void | Promise<void>,
  ignoreExceptions?: boolean,
}

export type ExecSyncResult<T> = [T] | [undefined, any];

// note: if "ignoreExceptions === true", then return type is (T | undefined)[]
export async function executePromisesSync<T>(arrayOfFn: AsyncWork<T>[], {beforeEach = noop, afterEach = noop, ignoreExceptions = false}: ExecutePromisesSyncOptions<T> = {}): Promise<ExecSyncResult<T>[]> {
  const result: ExecSyncResult<T>[] = [];
  for (let i = 0; i < arrayOfFn.length; i++) {
    await beforeEach(i);
    const work = arrayOfFn[i];
    const promiseResult: ExecSyncResult<T> = await (ignoreExceptions ? work().then<[T]>(x => [x]).catch(x => [undefined, x || 'unknown GSD error']) : work().then(x => [x]));
    result.push(promiseResult);
    await afterEach(i, promiseResult);
  }
  return result
}


export const NumberGenerator = (() => {
  let i = 0;
  return () => ++i;
})();

