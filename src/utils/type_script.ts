
export const getEnumKeys = <T extends { [name: string]: any }>(en: T) => Object.keys(en).filter(k => typeof en[k as any] === 'number');
export const getEnumValues = <T extends { [name: string]: any }>(en: T) => getEnumKeys(en).map(key => en[key]);
export const getEnumEntries = <T extends { [name: string]: any }>(en: T) => getEnumKeys(en).map(key => [key, en[key]]);

export const assert = <T>(name: T) => name;
export const is = <T>(name: T) => name;   // alias for assert type, example: "is<Device>({id: 3})

// this is suppose to be used to type things in filter
export const isInstance = <T>(ctor: new(...args: any[]) => T): (x: any) => x is T => <(x: any) => x is T>(x => x instanceof ctor);
