const { throwError, formatKey, encodeData, decodeData } = require('./helper');

const among = {
	storage: 'localStorage', // localStorage || sessionStorage
	encode: true,
	amongKey: '',
	// setting defaultt storager
	changeDefaultStorager(storager) {
		if (!/localStorage|sessionStorage/.test(storager)) return;
		this.storage = storager;
		return storager;
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
		return loadData;
	},
	// set key-value
	set(key, data) {
		if(!formatKey(key)) {
			throwError('paramter of key is wrong type');
			return false;
		}
		const saveData = this.encode ? encodeData(data) : data;
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

	}
}

module.exports = among;