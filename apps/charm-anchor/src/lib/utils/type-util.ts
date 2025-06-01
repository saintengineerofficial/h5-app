/**
 * type-util
 *
 * @author fukui
 */
const opt = Object.prototype.toString;

export const isObject = function (value: any) {
  return opt.call(value) === '[object Object]';
};

export const isArray = function (value: any) {
  return value instanceof Array || opt.call(value) === '[object Array]';
};
export const isDate = function (value: any) {
  return value instanceof Date || opt.call(value) === '[object Date]';
};
export const isNumber = function (value: any) {
  return value instanceof Number || opt.call(value) === '[object Number]';
};
export const isString = function (value: any) {
  return value instanceof String || opt.call(value) === '[object String]';
};
export const isBoolean = function (value: any) {
  return typeof value === 'boolean';
};

export const isFunction = function (value: any) {
  return typeof value === 'function';
};

export const isError = function (value: any) {
  return value instanceof Error || opt.call(value) === '[object Error]';
};

export const isEmpty = function (value: any) {
  return value === undefined || value === null;
};

export const isNotEmpty = function (value: any) {
  return value !== undefined && value !== null;
};

export const isUrl = function (value: any) {
  return /https?:\/\/[^\s]*/.test(value);
};

export const isEmail = function (value: any) {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
    value,
  );
};

export function isRegExp(obj: any) {
  return opt.call(obj) === '[object RegExp]';
}

export function isFile(obj: any): obj is File {
  return opt.call(obj) === '[object File]';
}

export function isBlob(obj: any): obj is Blob {
  return opt.call(obj) === '[object Blob]';
}

function isHex(color: string) {
  return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color);
}

function isRgb(color: string) {
  return /^rgb\((\s*\d+\s*,?){3}\)$/.test(color);
}

function isRgba(color: string) {
  return /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(color);
}
export function isColor(color: any): boolean {
  return isHex(color) || isRgb(color) || isRgba(color);
}
export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

export function isExist(obj: any): boolean {
  return obj || obj === 0;
}

export function isWindow(el: any): el is Window {
  return el === window;
}
