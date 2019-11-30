(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	var _require = require('./helper'),
	    throwError = _require.throwError,
	    formatKey = _require.formatKey,
	    encodeData = _require.encodeData,
	    decodeData = _require.decodeData;

	var among = {
		storage: 'localStorage', // localStorage || sessionStorage
		encode: true,
		amongKey: '',
		// setting defaultt storager
		changeDefaultStorager: function changeDefaultStorager(storager) {
			if (!/localStorage|sessionStorage/.test(storager)) return;
			this.storage = storager;
			return storager;
		},

		// set a amongKey to prevent clear action
		setAmongKey: function setAmongKey(key) {
			this.amongKey = key;
			return true;
		},

		// get value by key
		get: function get(key) {
			if (!formatKey(key)) {
				throwError('paramter of key is wrong type');
				return false;
			}
			var data = window[this.storage].getItem(key);
			var loadData = this.encode ? decodeData(data) : data;
			return loadData;
		},

		// set key-value
		set: function set(key, data) {
			if (!formatKey(key)) {
				throwError('paramter of key is wrong type');
				return false;
			}
			var saveData = this.encode ? encodeData(data) : data;
			window[this.storage].setItem(key, saveData);
			return key;
		},

		// update key-value
		update: function update(key, data) {
			if (!formatKey(key)) {
				throwError('paramter of key is wrong type');
				return false;
			}
			var isExistKey = this.get(key, data);
			if (isExistKey === null) {
				throwError('target key is not exist in current storage');
				return false;
			}
			this.set(key, data);
			return key;
		},

		// remove target key
		remove: function remove(key) {
			if (!formatKey(key)) {
				throwError('paramter of key is wrong type');
				return false;
			}
			window[this.storage].removeItem(key);
			return key;
		},

		// clear all saved data
		clear: function clear() {
			var amongKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			if (amongKey !== this.amongKey) {
				throwError('supply a among key to clear all data');
				return false;
			}
			window[this.storage].clear();
			return true;
		},

		// show all storage data
		getAll: function getAll() {}
	};

	module.exports = among;

}));
