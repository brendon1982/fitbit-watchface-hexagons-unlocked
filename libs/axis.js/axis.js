function type() {
  return Object.prototype.toString.call(this).slice(8, -1);
}

function is (self) {
  return function (elem) {
    return type.call(elem) === self;
  };
}

const isArray = is('Array');
const isObject = is('Object');
const isString = is('String');
const isDate = is('Date');
const isRegExp = is('RegExp');
const isFunction = is('Function');
const isBoolean = is('Boolean');
const isNumber = is('Number');
const isNull = is('Null');
const isUndefined = is('Undefined');

export {
  isArray,
  isObject,
  isString,
  isDate,
  isRegExp,
  isFunction,
  isBoolean,
  isNumber,
  isNull,
  isUndefined
}