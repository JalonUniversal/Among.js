const Utils = require('js-base64');
// judge data type
const judgeType = (target) => {
  if(target === undefined) return 'undefined';
  if(target === null) return 'null';
  return Object.prototype.toString.call(target, null).slice(8, -1).toString().toLowerCase();
}

// null undefined symbol function array object string number boolean
const formatKey = (key) => {
  let ret;
  const keyType = judgeType(key);
  if(/null|undefined|symbol|function/.test(keyType)) {
    ret = false;
  } else if(/array|object/.test(keyType)) {
    ret = JSON.stringify(key);
  } else {
    ret = String(key);
  }
  return ret;
}
  
// throw error
const throwError = (errorMessage) => {
  console.warn(errorMessage);
  return false;
}

// encode target data
const encodeData = (target) => {
  const dataType = judgeType(target);
  let saveData;
  if(!/number|string|array|object/.test(dataType)) {
    throwError('Avalibe Data Type is number, string, array and object!');
  }
  if(/number|string/.test(dataType)) {
    saveData = target;
  } else {
    saveData = JSON.stringify(target);
  }
  return Utils.Base64.encode(saveData);
}

// decode target data
const decodeData = (target) => {
  const dataType = judgeType(target);
  if(!/string/.test(dataType)) {
    throwError('Only parameters of type string can be accepted!');
  }
  return Utils.Base64.decode(target);
}

module.exports = {
  throwError,
  judgeType,
  formatKey,
  encodeData,
  decodeData
}