const isundef = function(o) {
	return o === null || typeof o === 'undefined';
}

exports.isundef = isundef;


exports.isvalid  = function(o) {
	return !isundef(o);
}


exports.makeMap = function(list, keyName) {
	let map = {};

	for (let i = 0; i < list.length; ++i) {
		const item = list[i];
		map[item[keyName]] = item;
	}

	return map;
}


exports.nvl = function(str, val) {
	return !isundef(str) ? str : val;
}


exports.nvl2 = function(str, val) {
	return (isundef(str) || '' === str) ? val : str;
}


exports.tickCount = function() {
	return new Date().getTime();
}


exports.istrue = function(v) {
	return !isundef(v) && v;
}


exports.hasKey = function(obj, key) {
	return obj ? hasOwnProperty.call(obj, key) : false;
}


exports.uuid4 = function() {
	// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
	let uuid = '', ii;

	for (ii = 0; ii < 32; ii += 1) {
		switch (ii) {
			case 8:
			case 20:
				uuid += '-';
				uuid += (Math.random() * 16 | 0).toString(16);
				break;
			case 12:
				uuid += '-';
				uuid += '4';
				break;
			case 16:
				uuid += '-';
				uuid += (Math.random() * 4 | 8).toString(16);
				break;
			default:
				uuid += (Math.random() * 16 | 0).toString(16);
		}
	}

	return uuid;
}


const isIn = function(val, valList) {
	if (isundef(val) || isundef(valList)) return false;

	for (let i = 0; i < valList.length; ++i) {
		if (valList[i] === '' + val) return true;
	}

	return false;
}


exports.isIn = isIn;

exports.isInArray = function(valList1, valList2) {
	if (isundef(valList1) || isundef(valList2)) return false;

	for (let i = 0; i < valList1.length; ++i) {
		if (isIn(valList1[i], valList2)) {
			return true;
		}
	}

	return false;
}


const getIndexInList = function(val, valList) {
	if (isundef(val)) return -1;
	val = '' + val;

	for (let i = 0; i < valList.length; ++i) {
		if ('' + valList[i] === val) return i;
	}

	return -1;
}

exports.getIndexInList = getIndexInList;

exports.nextValueInList = function(val, valList) {
	if (valList.length < 1) {
		return null;
	} else if (valList.length === 1) {
		return valList[0];
	}

	const nextIdx = getIndexInList(val, valList) + 1;
	if (nextIdx < valList.length ) {
		return valList[nextIdx];
	}

	return valList[0];
}


exports.getIndexInListEx = function(val, valList, key) {
	if (isundef(val)) return -1;
	val = '' + val;

	for (let i = 0; i < valList.length; ++i) {
		if ('' + valList[i][key] === val) return i;
	}

	return -1;
}


exports.makeid = function(digitNum) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < digitNum; ++i) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}


// 1: true, false
// 2: numeric 0, 1
// 3: "true", "false"
// 4: "0", "1"
// 5: "on", "off"
// 6: "ON", "OFF"
exports.BoolTool = {
	checkType: function(val) {
		switch( typeof val ) {
			case 'boolean':
				return 1;
			case 'number':
				return 2;
			default:
				if (val === 'true' || val === 'false') {
					return 3;
				} else if (val === '0' || val === '1') {
					return 4;
				} else if (val === 'on' || val === 'off') {
					return 5;
				} else if (val === 'ON' || val === 'OFF') {
					return 6;
				}
		}

		return 1;
	},

	boolValue: function(value, type) {
		switch( type ) {
			case 2:
				return value !== 0;

			case 3: // fall-throught
			case 4: // fall-throught
			case 5: // fall-throught
			case 6: // fall-throught
				return value === '1' || value === 'true' || value === 'on' || value === 'ON';

			case 1: // fall-throught
			default: // fall-throught
				break;
		}

		return value;
	},

	originalValue: function(boolVal, type) {
		switch (type) {
			case 2:
				return boolVal ? 1 : 0;
			case 3:
				return boolVal ? 'true' : 'false';
			case 4:
				return boolVal ? '1' : '0';
			case 5:
				return boolVal ? 'on' : 'off';
			case 6:
				return boolVal ? 'ON' : 'OFF';
			default:
				break;
		}

		return boolVal;
	},

	anotherOriginal: function(boolVal, type) {
		switch (type) {
			case 2:
				return boolVal ? 0 : 1;
			case 3:
				return boolVal ? 'false' : 'true';
			case 4:
				return boolVal ? '0' : '1';
			case 5:
				return boolVal ? 'off' : 'on';
			case 6:
				return boolVal ? 'OFF' : 'ON';
			default:
				break;
		}

		return !boolVal;
	}
};


exports.isInteger = function (value) {
  return (typeof value === 'number'
    && isFinite(value)
    && Math.round(value) === value
  );
}


exports.jsonParse = function(str) {
	if( typeof str !== 'string' ) {
		return typeof str === 'object' ? str : null;
	}

	var jsonObj = null;

	try {
		jsonObj = JSON.parse(str)
	} catch(e) {
		jsonObj = null;
	}

	return jsonObj;
}


// 객체를 똑같이 복사하여 생성한 객체 반환. (Deep Copy)
exports.copyObject = function(obj) {
	return JSON.parse(JSON.stringify(obj));
}


exports.readTextFile = function(file, cb) {
  const rawFile = new XMLHttpRequest();

  rawFile.open('GET', file, false);
  rawFile.onreadystatechange = () => {
    if( rawFile.readyState === 4 ) {
      if(rawFile.status === 200 || rawFile.status === 0) {
        if( cb ) {
        	cb(rawFile.responseText);
        }
      } else if( cb ) {
      	cb(null);
      }
    }
  }

  rawFile.send(null);
}



var _logger_ = null;

exports.setLogger = function(logger) {
	_logger_ = logger;
}


/**
	level --------------
	emergency: 0,
	alert: 1,
	critical: 2,
	error: 3,
	warning: 4,
	notice: 5,
	info: 6,
	...
 */
exports.debugOut = function(m, w, o) {
	// TODO 아래 라인 제거
	// if( m === 'LSS') return;

	var msg = o;
	var level = 6;

	if (typeof o === 'object') {
		msg = isundef(o) ? 'undefined' : JSON.stringify(o);
	}

	console.log(new Date(), m, w, msg);

	if (!isundef(_logger_)) {
		var p = 0;
		var limit = 768;
		var wh = '<' + w + '> ';

		/*
		const pmloglib = {
		  emergency: 0,
		  alert: 1,
		  critical: 2,
		  error: 3,
		  warning: 4,
		  notice: 5,
		  info: 6,
		  ...
		} // */
		while (p < msg.length) {
			var r = Math.min(msg.length - p, limit);
			_logger_.log(level, m.toUpperCase(), {}, wh + msg.substring(p, p + r));
			p += r;
		}
	}
}

let _globalMsgHandler_ = null;
exports.setGlobalMessageHandle = function(handle) {
	_globalMsgHandler_ = handle;
}

exports.showGlobalMessage = function(msg) {
	if( _globalMsgHandler_ ) {
		_globalMsgHandler_(msg);
	}
}


/*
exports.printOut = function(m, w, o) {
	loggingOut(6, m, w, o);
}


exports.debugOut = function(m, w, o) {
	loggingOut(7, m, w, o);
}
// */