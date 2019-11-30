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

// judge whether the string is a parseable JSON string
const isCanParseJSON = str => {
  if(!str) return false;
  const isString = judgeType(str) === 'string';
  const isJSONObj = str.startsWith('{') && str.endsWith('}');
  const isJSONArr = str.startsWith('[') && str.endsWith(']');
  return isString && (isJSONObj || isJSONArr);
}
  
// throw error
const throwError = (errorMessage) => {
  console.warn(errorMessage);
  return false;
}

// encode target data
const encodeData = (target) => Utils.Base64.encode(target);

// decode target data
const decodeData = (target) =>  Utils.Base64.decode(target);

module.exports = {
  throwError,
  judgeType,
  formatKey,
  isCanParseJSON,
  encodeData,
  decodeData
}