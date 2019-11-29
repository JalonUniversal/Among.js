const Utils = require('js-base64');
// judge data type
const judgeType = (target) => {
  if(target === undefined) return 'undefined';
  if(target === null) return 'null';
  return Object.prototype.toString.call(target, null).slice(8, -1).toString().toLowerCase();
}
// throw error
const throwError = (errorMessage) => {
  throw new Error(errorMessage);
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
  encodeData,
  decodeData
}