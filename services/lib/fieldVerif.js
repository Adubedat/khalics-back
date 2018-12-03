// const exports = module.exports = {};

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
  const isNum = array.every(val => typeof val === 'string');
  return isNum;
};
