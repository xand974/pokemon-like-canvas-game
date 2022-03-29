export type MakePick<Type, Keys extends keyof Type> = { [Key in Keys]: Type[Key] };
export type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T];
export type AllKeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp | undefined ? P : never }[keyof T];
export type StringKeys<T> = { [P in keyof T]: T[P] extends string ? P : never }[keyof T];
export type BooleanKeys<T> = { [P in keyof T]: T[P] extends boolean ? P : never }[keyof T];
export type AllBooleanKeys<T> = { [P in keyof T]: T[P] extends boolean | undefined ? P : never }[keyof T];

export type Falsy = false | 0 | '' | null | undefined;    // WARNING: there is no NaN in TS: https://github.com/Microsoft/TypeScript/issues/15135

export type StringTuple = [string, string];
export type StringTuple3 = [string, string, string];
export type NumbersTuple = [number, number];
export type NumbersTuple8 = [number, number, number, number, number, number, number, number];
export type NumericObject = { [key: string]: number };
export type BooleanObject = { [key: string]: boolean };
export type AnyObject = { [key: string]: any };

export type AsyncWork<T> = () => Promise<T>;

export type TextOrHtml = string | HTMLElement | HTMLElement[];


// export type PredicateFunction = (...params: any[]) => boolean;
export type PredicateFunction<T> = (item: T) => boolean;
export type PredicateAnyFunction = (...args: any[]) => boolean;
export type OptionalBooleanFunction = () => boolean | undefined | void;

// https://stackoverflow.com/a/49725198/1376947
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & {
  [K in Keys]-?:
  Required<Pick<T, K>>
  & Partial<Record<Exclude<Keys, K>, undefined>>
}[Keys]


// fixing bad event types:    // or is it???

export interface HTMLElementEvent extends Event {
  target: HTMLElement & EventTarget;
}

export interface FileReaderEventTarget extends EventTarget {
  result: string
}

export interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

// HTML:
export type HtmlInputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';


// browser API:
export type StorageAreaType = 'local' | 'sync';
