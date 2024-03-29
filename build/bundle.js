(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.among = factory());
}(this, function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var base64 = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	     module.exports = factory(global)
	        ;
	}((
	    typeof self !== 'undefined' ? self
	        : typeof window !== 'undefined' ? window
	        : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal
	: commonjsGlobal
	), function(global) {
	    // existing version for noConflict()
	    global = global || {};
	    var _Base64 = global.Base64;
	    var version = "2.5.1";
	    // if node.js and NOT React Native, we use Buffer
	    var buffer;
	    if ( module.exports) {
	        try {
	            buffer = eval("require('buffer').Buffer");
	        } catch (err) {
	            buffer = undefined;
	        }
	    }
	    // constants
	    var b64chars
	        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	    var b64tab = function(bin) {
	        var t = {};
	        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
	        return t;
	    }(b64chars);
	    var fromCharCode = String.fromCharCode;
	    // encoder stuff
	    var cb_utob = function(c) {
	        if (c.length < 2) {
	            var cc = c.charCodeAt(0);
	            return cc < 0x80 ? c
	                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
	                                + fromCharCode(0x80 | (cc & 0x3f)))
	                : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
	                   + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
	                   + fromCharCode(0x80 | ( cc         & 0x3f)));
	        } else {
	            var cc = 0x10000
	                + (c.charCodeAt(0) - 0xD800) * 0x400
	                + (c.charCodeAt(1) - 0xDC00);
	            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
	                    + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
	                    + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
	                    + fromCharCode(0x80 | ( cc         & 0x3f)));
	        }
	    };
	    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
	    var utob = function(u) {
	        return u.replace(re_utob, cb_utob);
	    };
	    var cb_encode = function(ccc) {
	        var padlen = [0, 2, 1][ccc.length % 3],
	        ord = ccc.charCodeAt(0) << 16
	            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
	            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
	        chars = [
	            b64chars.charAt( ord >>> 18),
	            b64chars.charAt((ord >>> 12) & 63),
	            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
	            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
	        ];
	        return chars.join('');
	    };
	    var btoa = global.btoa ? function(b) {
	        return global.btoa(b);
	    } : function(b) {
	        return b.replace(/[\s\S]{1,3}/g, cb_encode);
	    };
	    var _encode = buffer ?
	        buffer.from && Uint8Array && buffer.from !== Uint8Array.from
	        ? function (u) {
	            return (u.constructor === buffer.constructor ? u : buffer.from(u))
	                .toString('base64')
	        }
	        :  function (u) {
	            return (u.constructor === buffer.constructor ? u : new  buffer(u))
	                .toString('base64')
	        }
	        : function (u) { return btoa(utob(u)) }
	    ;
	    var encode = function(u, urisafe) {
	        return !urisafe
	            ? _encode(String(u))
	            : _encode(String(u)).replace(/[+\/]/g, function(m0) {
	                return m0 == '+' ? '-' : '_';
	            }).replace(/=/g, '');
	    };
	    var encodeURI = function(u) { return encode(u, true) };
	    // decoder stuff
	    var re_btou = new RegExp([
	        '[\xC0-\xDF][\x80-\xBF]',
	        '[\xE0-\xEF][\x80-\xBF]{2}',
	        '[\xF0-\xF7][\x80-\xBF]{3}'
	    ].join('|'), 'g');
	    var cb_btou = function(cccc) {
	        switch(cccc.length) {
	        case 4:
	            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
	                |    ((0x3f & cccc.charCodeAt(1)) << 12)
	                |    ((0x3f & cccc.charCodeAt(2)) <<  6)
	                |     (0x3f & cccc.charCodeAt(3)),
	            offset = cp - 0x10000;
	            return (fromCharCode((offset  >>> 10) + 0xD800)
	                    + fromCharCode((offset & 0x3FF) + 0xDC00));
	        case 3:
	            return fromCharCode(
	                ((0x0f & cccc.charCodeAt(0)) << 12)
	                    | ((0x3f & cccc.charCodeAt(1)) << 6)
	                    |  (0x3f & cccc.charCodeAt(2))
	            );
	        default:
	            return  fromCharCode(
	                ((0x1f & cccc.charCodeAt(0)) << 6)
	                    |  (0x3f & cccc.charCodeAt(1))
	            );
	        }
	    };
	    var btou = function(b) {
	        return b.replace(re_btou, cb_btou);
	    };
	    var cb_decode = function(cccc) {
	        var len = cccc.length,
	        padlen = len % 4,
	        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
	            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
	            | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
	            | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
	        chars = [
	            fromCharCode( n >>> 16),
	            fromCharCode((n >>>  8) & 0xff),
	            fromCharCode( n         & 0xff)
	        ];
	        chars.length -= [0, 0, 2, 1][padlen];
	        return chars.join('');
	    };
	    var _atob = global.atob ? function(a) {
	        return global.atob(a);
	    } : function(a){
	        return a.replace(/\S{1,4}/g, cb_decode);
	    };
	    var atob = function(a) {
	        return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));
	    };
	    var _decode = buffer ?
	        buffer.from && Uint8Array && buffer.from !== Uint8Array.from
	        ? function(a) {
	            return (a.constructor === buffer.constructor
	                    ? a : buffer.from(a, 'base64')).toString();
	        }
	        : function(a) {
	            return (a.constructor === buffer.constructor
	                    ? a : new buffer(a, 'base64')).toString();
	        }
	        : function(a) { return btou(_atob(a)) };
	    var decode = function(a){
	        return _decode(
	            String(a).replace(/[-_]/g, function(m0) { return m0 == '-' ? '+' : '/' })
	                .replace(/[^A-Za-z0-9\+\/]/g, '')
	        );
	    };
	    var noConflict = function() {
	        var Base64 = global.Base64;
	        global.Base64 = _Base64;
	        return Base64;
	    };
	    // export Base64
	    global.Base64 = {
	        VERSION: version,
	        atob: atob,
	        btoa: btoa,
	        fromBase64: decode,
	        toBase64: encode,
	        utob: utob,
	        encode: encode,
	        encodeURI: encodeURI,
	        btou: btou,
	        decode: decode,
	        noConflict: noConflict,
	        __buffer__: buffer
	    };
	    // if ES5 is available, make Base64.extendString() available
	    if (typeof Object.defineProperty === 'function') {
	        var noEnum = function(v){
	            return {value:v,enumerable:false,writable:true,configurable:true};
	        };
	        global.Base64.extendString = function () {
	            Object.defineProperty(
	                String.prototype, 'fromBase64', noEnum(function () {
	                    return decode(this)
	                }));
	            Object.defineProperty(
	                String.prototype, 'toBase64', noEnum(function (urisafe) {
	                    return encode(this, urisafe)
	                }));
	            Object.defineProperty(
	                String.prototype, 'toBase64URI', noEnum(function () {
	                    return encode(this, true)
	                }));
	        };
	    }
	    //
	    // export Base64 to the namespace
	    //
	    if (global['Meteor']) { // Meteor.js
	        Base64 = global.Base64;
	    }
	    // module.exports and AMD are mutually exclusive.
	    // module.exports has precedence.
	    if ( module.exports) {
	        module.exports.Base64 = global.Base64;
	    }
	    // that's it!
	    return {Base64: global.Base64}
	}));
	});
	var base64_1 = base64.Base64;

	// judge data type
	var judgeType = function judgeType(target) {
	  if (target === undefined) return 'undefined';
	  if (target === null) return 'null';
	  return Object.prototype.toString.call(target, null).slice(8, -1).toString().toLowerCase();
	};

	// null undefined symbol function array object string number boolean
	var formatKey = function formatKey(key) {
	  var ret = void 0;
	  var keyType = judgeType(key);
	  if (/null|undefined|symbol|function/.test(keyType)) {
	    ret = false;
	  } else if (/array|object/.test(keyType)) {
	    ret = JSON.stringify(key);
	  } else {
	    ret = String(key);
	  }
	  return ret;
	};

	// judge whether the string is a parseable JSON string
	var isCanParseJSON = function isCanParseJSON(str) {
	  if (!str) return false;
	  var isString = judgeType(str) === 'string';
	  var isJSONObj = str.startsWith('{') && str.endsWith('}');
	  var isJSONArr = str.startsWith('[') && str.endsWith(']');
	  return isString && (isJSONObj || isJSONArr);
	};

	// throw error
	var throwError = function throwError(errorMessage) {
	  console.warn(errorMessage);
	  return false;
	};

	// encode target data
	var encodeData = function encodeData(target) {
	  return base64.Base64.encode(target);
	};

	// decode target data
	var decodeData = function decodeData(target) {
	  return base64.Base64.decode(target);
	};

	var helper = {
	  throwError: throwError,
	  judgeType: judgeType,
	  formatKey: formatKey,
	  isCanParseJSON: isCanParseJSON,
	  encodeData: encodeData,
	  decodeData: decodeData
	};

	var judgeType$1 = helper.judgeType,
	    throwError$1 = helper.throwError,
	    formatKey$1 = helper.formatKey,
	    isCanParseJSON$1 = helper.isCanParseJSON,
	    encodeData$1 = helper.encodeData,
	    decodeData$1 = helper.decodeData;


	var amongOrigin = {
		storage: 'localStorage', // localStorage || sessionStorage
		encode: true,
		amongKey: '',
		// setting defaultt storager
		changeDefaultStorager: function changeDefaultStorager(storager) {
			if (!/localStorage|sessionStorage/.test(storager)) return;
			this.storage = storager;
			return storager;
		},

		// turn on encode
		openEncoding: function openEncoding() {
			this.encode = true;
		},

		// turn off encode
		closeEncoding: function closeEncoding() {
			this.encode = false;
		},

		// set a amongKey to prevent clear action
		setAmongKey: function setAmongKey(key) {
			this.amongKey = key;
			return true;
		},

		// get value by key
		get: function get(key) {
			if (!formatKey$1(key)) {
				throwError$1('paramter of key is wrong type');
				return false;
			}
			var data = window[this.storage].getItem(key);
			var loadData = this.encode ? decodeData$1(data) : data;
			var parseRet = isCanParseJSON$1(loadData) ? JSON.parse(loadData) : loadData;
			return parseRet;
		},

		// set key-value
		set: function set(key, data) {
			if (!formatKey$1(key)) {
				throwError$1('paramter of key is wrong type');
				return false;
			}
			var dataType = judgeType$1(data);
			if (!/number|string|array|object/.test(dataType)) {
				// symbol|null|undefined|function is not allowed
				throwError$1('Avalibe Data Type is number, string, array and object!');
				return;
			}
			var saveTarget = /number|string/.test(dataType) ? data : JSON.stringify(data);
			var saveData = this.encode ? encodeData$1(saveTarget) : saveTarget;
			window[this.storage].setItem(key, saveData);
			return key;
		},

		// update key-value
		update: function update(key, data) {
			if (!formatKey$1(key)) {
				throwError$1('paramter of key is wrong type');
				return false;
			}
			var isExistKey = this.get(key, data);
			if (isExistKey === null) {
				throwError$1('target key is not exist in current storage');
				return false;
			}
			this.set(key, data);
			return key;
		},

		// remove target key
		remove: function remove(key) {
			if (!formatKey$1(key)) {
				throwError$1('paramter of key is wrong type');
				return false;
			}
			window[this.storage].removeItem(key);
			return key;
		},

		// clear all saved data
		clear: function clear() {
			var amongKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			if (amongKey !== this.amongKey) {
				throwError$1('supply a among key to clear all data');
				return false;
			}
			window[this.storage].clear();
			return true;
		},

		// show all storage data
		getAll: function getAll() {
			return JSON.parse(JSON.stringify(window[this.storage]));
		}
	};

	var among = Object.defineProperties(amongOrigin, {
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

	var main = among;

	return main;

}));
