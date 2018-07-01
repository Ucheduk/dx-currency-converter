/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _IndexController = __webpack_require__(1);

var _IndexController2 = _interopRequireDefault(_IndexController);

var _Currency = __webpack_require__(2);

var _Currency2 = _interopRequireDefault(_Currency);

var _UI = __webpack_require__(4);

var _UI2 = _interopRequireDefault(_UI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currency = new _Currency2.default(); /**
                                          * Currency Converter App
                                          * ALC 3.0 7days Challenge
                                          * Google Africa Challenge Scholarship
                                          * Udacity
                                          *
                                          * @version 1.0.0
                                          * @author  Nwakwuo Uche Kingsley
                                          * @license ALC 
                                          *
                                          **/

var ui = new _UI2.default();

// Check if ServiceWorker enabled 
if ('serviceWorker' in navigator) {

  // Register ServiceWorker
  navigator.serviceWorker.register('./Sw.js').then(function (reg) {
    console.log('[ServiceWorker Registered]', reg);
  }).catch(function (err) {
    return console.log('[ServiceWorker Registered Failed]', err);
  });
}

// Event on convert btn click
document.addEventListener('click', convertCurrency);
function convertCurrency(e) {
  if (e.target.classList.contains('convertBtn') || e.target.classList.contains('fas', 'fa-arrow-alt-circle-right', 'fa-1.5x')) {
    console.log(e.target);

    var from = document.getElementById('fromVal').value;
    var to = document.getElementById("toVal").value;
    var amount = parseFloat(document.getElementById("amount").value);
    var indexCtrl = new _IndexController2.default(from, to, amount);

    // Display the calculated data
    indexCtrl.get().then(function (data) {
      ui.getCurrencyVal(data);
      console.log(data, e);
    }).catch(function (err) {
      return console.log(err);
    });
  }
  e.preventDefault();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IndexController = function () {
    function IndexController(from, to, amount) {
        _classCallCheck(this, IndexController);

        this.url = 'https://free.currencyconverterapi.com/api/v5/';
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

    // Gets the qurey data from the API


    _createClass(IndexController, [{
        key: 'get',
        value: function get() {
            var _this = this;

            var qurey = this.from + '_' + this.to;
            return new Promise(function (resolve, reject) {
                fetch(_this.url + 'convert?q=' + qurey).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    return reject(err);
                });

                return qurey;
            });
        }
    }]);

    return IndexController;
}();

exports.default = IndexController;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _idb = __webpack_require__(3);

var _idb2 = _interopRequireDefault(_idb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Currency = function () {
    function Currency() {
        _classCallCheck(this, Currency);

        this.url = 'https://free.currencyconverterapi.com/api/v5/currencies';
        this.fromVal = document.getElementById('fromVal');
        this.toVal = document.getElementById('toVal');
        this.getCurrencies();
        this.dbPromise();
    }

    _createClass(Currency, [{
        key: 'dbPromise',
        value: function dbPromise() {
            // If the browser doesn't support service worker,
            // we don't care about having a database
            if (!navigator.serviceWorker) {
                return Promise.resolve();
            }

            return _idb2.default.open('dx', 1, function (upgradeDb) {
                var store = upgradeDb.createObjectStore('dx', {
                    keyPath: 'id'
                });
                console.log("Store Created");
            });
        }

        // Gets all currencies from the currencies API
        // and display in select input

    }, {
        key: 'getCurrencies',
        value: function getCurrencies() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                fetch('' + _this.url).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    resolve(data);

                    var currencies = data.results;

                    _this.dbPromise().then(function (db) {
                        if (!db) return;

                        var tx = db.transaction('dx', 'readwrite');
                        var store = tx.objectStore('dx');
                        for (var key in currencies) {
                            if (currencies.hasOwnProperty(key)) {
                                var _currency = currencies[key];

                                // Adds currency data to IndexedDB
                                store.put(_currency);
                                _this.fromVal.innerHTML += '<option value="' + _currency.id + '">' + _currency.id + ' (' + _currency.currencyName + ')</option>';
                                _this.toVal.innerHTML += '<option value="' + _currency.id + '">' + _currency.id + ' (' + _currency.currencyName + ')</option>';
                            }
                        }
                        document.getElementById("fromVal").selectedIndex = "8";
                        document.getElementById("toVal").selectedIndex = "72";
                    });
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }]);

    return Currency;
}();

exports.default = Currency;


var currency = new Currency();

currency.dbPromise();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function() {
  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function(resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }
  
  function promisifyCursorRequestCall(obj, method, args) {
    var p = promisifyRequestCall(obj, method, args);
    return p.then(function(value) {
      if (!value) return;
      return new Cursor(value, p.request);
    });
  }

  function proxyProperties(ProxyClass, targetProp, properties) {
    properties.forEach(function(prop) {
      Object.defineProperty(ProxyClass.prototype, prop, {
        get: function() {
          return this[targetProp][prop];
        },
        set: function(val) {
          this[targetProp][prop] = val;
        }
      });
    });
  }

  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return this[targetProp][prop].apply(this[targetProp], arguments);
      };
    });
  }

  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function Index(index) {
    this._index = index;
  }

  proxyProperties(Index, '_index', [
    'name',
    'keyPath',
    'multiEntry',
    'unique'
  ]);

  proxyRequestMethods(Index, '_index', IDBIndex, [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(Index, '_index', IDBIndex, [
    'openCursor',
    'openKeyCursor'
  ]);

  function Cursor(cursor, request) {
    this._cursor = cursor;
    this._request = request;
  }

  proxyProperties(Cursor, '_cursor', [
    'direction',
    'key',
    'primaryKey',
    'value'
  ]);

  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
    'update',
    'delete'
  ]);

  // proxy 'next' methods
  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
    if (!(methodName in IDBCursor.prototype)) return;
    Cursor.prototype[methodName] = function() {
      var cursor = this;
      var args = arguments;
      return Promise.resolve().then(function() {
        cursor._cursor[methodName].apply(cursor._cursor, args);
        return promisifyRequest(cursor._request).then(function(value) {
          if (!value) return;
          return new Cursor(value, cursor._request);
        });
      });
    };
  });

  function ObjectStore(store) {
    this._store = store;
  }

  ObjectStore.prototype.createIndex = function() {
    return new Index(this._store.createIndex.apply(this._store, arguments));
  };

  ObjectStore.prototype.index = function() {
    return new Index(this._store.index.apply(this._store, arguments));
  };

  proxyProperties(ObjectStore, '_store', [
    'name',
    'keyPath',
    'indexNames',
    'autoIncrement'
  ]);

  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'put',
    'add',
    'delete',
    'clear',
    'get',
    'getAll',
    'getKey',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'openCursor',
    'openKeyCursor'
  ]);

  proxyMethods(ObjectStore, '_store', IDBObjectStore, [
    'deleteIndex'
  ]);

  function Transaction(idbTransaction) {
    this._tx = idbTransaction;
    this.complete = new Promise(function(resolve, reject) {
      idbTransaction.oncomplete = function() {
        resolve();
      };
      idbTransaction.onerror = function() {
        reject(idbTransaction.error);
      };
      idbTransaction.onabort = function() {
        reject(idbTransaction.error);
      };
    });
  }

  Transaction.prototype.objectStore = function() {
    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
  };

  proxyProperties(Transaction, '_tx', [
    'objectStoreNames',
    'mode'
  ]);

  proxyMethods(Transaction, '_tx', IDBTransaction, [
    'abort'
  ]);

  function UpgradeDB(db, oldVersion, transaction) {
    this._db = db;
    this.oldVersion = oldVersion;
    this.transaction = new Transaction(transaction);
  }

  UpgradeDB.prototype.createObjectStore = function() {
    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
  };

  proxyProperties(UpgradeDB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(UpgradeDB, '_db', IDBDatabase, [
    'deleteObjectStore',
    'close'
  ]);

  function DB(db) {
    this._db = db;
  }

  DB.prototype.transaction = function() {
    return new Transaction(this._db.transaction.apply(this._db, arguments));
  };

  proxyProperties(DB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(DB, '_db', IDBDatabase, [
    'close'
  ]);

  // Add cursor iterators
  // TODO: remove this once browsers do the right thing with promises
  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
    [ObjectStore, Index].forEach(function(Constructor) {
      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
        var args = toArray(arguments);
        var callback = args[args.length - 1];
        var nativeObject = this._store || this._index;
        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
        request.onsuccess = function() {
          callback(request.result);
        };
      };
    });
  });

  // polyfill getAll
  [Index, ObjectStore].forEach(function(Constructor) {
    if (Constructor.prototype.getAll) return;
    Constructor.prototype.getAll = function(query, count) {
      var instance = this;
      var items = [];

      return new Promise(function(resolve) {
        instance.iterateCursor(query, function(cursor) {
          if (!cursor) {
            resolve(items);
            return;
          }
          items.push(cursor.value);

          if (count !== undefined && items.length == count) {
            resolve(items);
            return;
          }
          cursor.continue();
        });
      });
    };
  });

  var exp = {
    open: function(name, version, upgradeCallback) {
      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
      var request = p.request;

      request.onupgradeneeded = function(event) {
        if (upgradeCallback) {
          upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
        }
      };

      return p.then(function(db) {
        return new DB(db);
      });
    },
    delete: function(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
    }
  };

  if (true) {
    module.exports = exp;
  }
  else {
    self.idb = exp;
  }
}());


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI = function () {
  function UI() {
    _classCallCheck(this, UI);

    this.fromVal = document.getElementById('fromVal');
    this.toVal = document.getElementById('toVal');
    this.from = document.getElementById('fromVal').value;
    this.to = document.getElementById("toVal").value;
  }

  // Gets qurey data from IndexController


  _createClass(UI, [{
    key: 'getCurrencyVal',
    value: function getCurrencyVal(data) {

      var from = document.getElementById('fromVal').value;
      var to = document.getElementById("toVal").value;
      var amount = parseFloat(document.getElementById("amount").value);
      var amtVal = document.getElementById('content');

      var obj = data.results;
      var result = Object.values(obj);

      // Calculates the result of the amount to convert
      var amt = amount * result[0].val;
      amt = amt.toFixed(2);
      if (document.getElementById("amount").value !== '') {
        if (amt !== '') {

          // Changing the DOM to show calculated result
          amtVal.innerHTML = '\n            <h1>Currency Converter</h1>\n            <p><span class="amtInput">' + amount + ' ' + from + ' =</span><br>\n              <span class="amtval">' + amt + ' ' + to + '</span><br>\n              <span class="fromcurr">' + from + '</span> <i class="fas fa-arrows-alt-h"></i> <span class="tocurr">' + to + '</span><br>\n              <span class="rate">1 ' + from + ' = ' + result[0].val + ' ' + to + '</span>\n            </p>\n            ';
        }
      }
      document.getElementById("amount").value = ' ';
    }
  }]);

  return UI;
}();

exports.default = UI;

/***/ })
/******/ ]);