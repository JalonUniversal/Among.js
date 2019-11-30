const { 
	judgeType,
	throwError, 
	formatKey, 
	isCanParseJSON,
	encodeData, 
	decodeData 
} = require('./helper');

const amongOrigin = {
	storage: 'localStorage', // localStorage || sessionStorage
	encode: true,
	amongKey: '',
	// setting defaultt storager
	changeDefaultStorager(storager) {
		if (!/localStorage|sessionStorage/.test(storager)) return;
		this.storage = storager;
		return storager;
	},
	// turn on encode
	openEncoding() {
		this.encode = true;
	},
	// turn off encode
	closeEncoding() {
		this.encode = false;
	},
	// set a amongKey to prevent clear action
	setAmongKey(key) {
		this.amongKey = key;
		return true;
	},
	// get value by key
	get(key) {
		if(!formatKey(key)) {
			throwError('paramter of key is wrong type');
			return false;
		}
		const data = window[this.storage].getItem(key);
		const loadData = this.encode ? decodeData(data) : data;
		const parseRet = isCanParseJSON(loadData) ? JSON.parse(loadData) : loadData;
		return parseRet;
	},
	// set key-value
	set(key, data) {
		if(!formatKey(key)) {
			throwError('paramter of key is wrong type');
			return false;
		}
		const dataType = judgeType(data);
		if(!/number|string|array|object/.test(dataType)) { // symbol|null|undefined|function is not allowed
			throwError('Avalibe Data Type is number, string, array and object!');
			return;
		}
		const saveTarget = /number|string/.test(dataType) ? data : JSON.stringify(data);
		const saveData = this.encode ? encodeData(saveTarget) : saveTarget;
		window[this.storage].setItem(key, saveData);
		return key;
	},
	// update key-value
	update(key, data) {
		if(!formatKey(key)) {
			throwError('paramter of key is wrong type');
			return false;
		}
		const isExistKey = this.get(key, data);
		if(isExistKey === null) {
			throwError('target key is not exist in current storage');
			return false;
		} 
		this.set(key, data);
		return key;
	},
	// remove target key
	remove(key) { 
		if(!formatKey(key)) {
			throwError('paramter of key is wrong type');
			return false;
		}
		window[this.storage].removeItem(key);
		return key;
	},
	// clear all saved data
	clear(amongKey = '') {
		if(amongKey !== this.amongKey) {
			throwError('supply a among key to clear all data');
			return false;
		}
		window[this.storage].clear();
		return true;
	},
	// show all storage data
	getAll() {
		return JSON.parse(JSON.stringify(window[this.storage]));
	}
}

const among = Object.defineProperties(amongOrigin, {
	"storage": {
		enumerable: false
	},
	"encode": {
		enumerable: false
	},
	"amongKey": {
		enumerable: false
	}
});

module.exports = among;