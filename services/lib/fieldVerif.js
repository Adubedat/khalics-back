module.exports.isString = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return false;
  }
  const isStr = array.every(val => typeof val === 'string');
  return isStr;
};

module.exports.isNumber = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return false;
  }
  const isNum = array.every(val => typeof val === 'number');
  return isNum;
};

module.exports.isBoolean = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return false;
  }
  const isBool = array.every(val => typeof val === 'boolean');
  return isBool;
};

module.exports.isObject = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return false;
  }
  const isObj = array.every(val => Object.prototype.toString.call(val) === '[object Object]'
        || Object.keys(val).length > 0);
  return isObj;
};

// param is array of array of object
module.exports.isArrayOfObject = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return false;
  }
  const isArrayOfObj = array.every(val => module.exports.isObject(val));
  return isArrayOfObj;
};
