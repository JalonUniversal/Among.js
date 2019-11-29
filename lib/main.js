const { throwError, judgeType, encodeData, decodeData } = require('./helper');
const lg = console.log;

class Among {
  constructor() {
    this.defaultStorager = 'localStorage';
    this.encode = true;
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
    this.storage = this[this.defaultStorager];
  }
  // setting defaultt storager
  static changeDefaultStorager = storager => {
    if(!/localStorage|sessionStorage/.test(storager)) return;
    this.defaultStorager = storager;
  }
  static get = () => {}
  static save = (key, data) => {
    const saveData = this.encode ? encodeData(data) : data;
    this.storage.setItem(key, saveData);
    return true;
  }
  static update = () => {}
  static remove = () => {}
}