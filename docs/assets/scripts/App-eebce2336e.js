!function(n){var r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=n,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),u=a(r(1)),i=a(r(2)),c=a(r(4));function a(e){return e&&e.__esModule?e:{default:e}}new i.default;"serviceWorker"in navigator&&navigator.serviceWorker.register("./Sw.js").then(function(e){console.log("[ServiceWorker Registered]",e)}).catch(function(e){return console.log("[ServiceWorker Registered Failed]",e)});var s=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.ui=new c.default,this.event()}return o(t,[{key:"event",value:function(){document.addEventListener("click",this.convertCurrency(e))}},{key:"convertCurrency",value:function(e){var t=this;if(e.target.classList.contains("convertBtn")){var n=document.getElementById("fromVal").value,r=document.getElementById("toVal").value,o=parseFloat(document.getElementById("amount").value);new u.default(n,r,o).get().then(function(e){t.ui.getCurrencyVal(e)}).catch(function(e){return console.log(e)})}e.preventDefault()}}]),t}();n.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();var r=function(){function r(e,t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),this.url="https://free.currencyconverterapi.com/api/v5/",this.from=e,this.to=t,this.amount=n}return o(r,[{key:"get",value:function(){var e=this,r=this.from+"_"+this.to;return new Promise(function(t,n){return fetch(e.url+"convert?q="+r).then(function(e){return e.json()}).then(function(e){t(e)}).catch(function(e){return n(e)}),r})}}]),r}();t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),u=n(3),i=(r=u)&&r.__esModule?r:{default:r};var c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.url="https://free.currencyconverterapi.com/api/v5/currencies",this.fromVal=document.getElementById("fromVal"),this.toVal=document.getElementById("toVal"),this.getCurrencies(),this.dbPromise()}return o(e,[{key:"dbPromise",value:function(){return navigator.serviceWorker?i.default.open("dx",1,function(e){var t=e.createObjectStore("dx",{keyPath:"id"});console.log("Store Created",t)}):Promise.resolve()}},{key:"getCurrencies",value:function(){var u=this;return new Promise(function(t,n){fetch(""+u.url).then(function(e){return e.json()}).then(function(e){t(e);var o=e.results;u.dbPromise().then(function(e){if(e){var t=e.transaction("dx","readwrite").objectStore("dx");for(var n in o)if(o.hasOwnProperty(n)){var r=o[n];t.put(r),console.log("Currencies added",r),u.fromVal.innerHTML+='<option value="'+r.id+'">'+r.id+" ("+r.currencyName+")</option>",u.toVal.innerHTML+='<option value="'+r.id+'">'+r.id+" ("+r.currencyName+")</option>"}document.getElementById("fromVal").selectedIndex="8",document.getElementById("toVal").selectedIndex="72"}})}).catch(function(e){return n(e)})})}}]),e}();(new(t.default=c)).dbPromise()},function(p,e,t){"use strict";!function(){function i(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function u(n,r,o){var u,e=new Promise(function(e,t){i(u=n[r].apply(n,o)).then(e,t)});return e.request=u,e}function e(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function t(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return u(this[n],e,arguments)})})}function n(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function r(e,r,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[r],(t=u(e,n,arguments)).then(function(e){if(e)return new c(e,t.request)});var e,t})})}function o(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function a(e){this._store=e}function s(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function l(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new s(n)}function f(e){this._db=e}e(o,"_index",["name","keyPath","multiEntry","unique"]),t(o,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),r(o,"_index",IDBIndex,["openCursor","openKeyCursor"]),e(c,"_cursor",["direction","key","primaryKey","value"]),t(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(c.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),i(t._request).then(function(e){if(e)return new c(e,t._request)})})})}),a.prototype.createIndex=function(){return new o(this._store.createIndex.apply(this._store,arguments))},a.prototype.index=function(){return new o(this._store.index.apply(this._store,arguments))},e(a,"_store",["name","keyPath","indexNames","autoIncrement"]),t(a,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),r(a,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),n(a,"_store",IDBObjectStore,["deleteIndex"]),s.prototype.objectStore=function(){return new a(this._tx.objectStore.apply(this._tx,arguments))},e(s,"_tx",["objectStoreNames","mode"]),n(s,"_tx",IDBTransaction,["abort"]),l.prototype.createObjectStore=function(){return new a(this._db.createObjectStore.apply(this._db,arguments))},e(l,"_db",["name","version","objectStoreNames"]),n(l,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new s(this._db.transaction.apply(this._db,arguments))},e(f,"_db",["name","version","objectStoreNames"]),n(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(u){[a,o].forEach(function(e){e.prototype[u.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],r=this._store||this._index,o=r[u].apply(r,t.slice(0,-1));o.onsuccess=function(){n(o.result)}}})}),[o,a].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var r=this,o=[];return new Promise(function(t){r.iterateCursor(e,function(e){e?(o.push(e.value),void 0===n||o.length!=n?e.continue():t(o)):t(o)})})})});var d={open:function(e,t,n){var r=u(indexedDB,"open",[e,t]),o=r.request;return o.onupgradeneeded=function(e){n&&n(new l(o.result,e.oldVersion,o.transaction))},r.then(function(e){return new f(e)})},delete:function(e){return u(indexedDB,"deleteDatabase",[e])}};p.exports=d}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.fromVal=document.getElementById("fromVal"),this.toVal=document.getElementById("toVal"),this.from=document.getElementById("fromVal").value,this.to=document.getElementById("toVal").value}return r(e,[{key:"getCurrencyVal",value:function(e){var t=document.getElementById("fromVal").value,n=document.getElementById("toVal").value,r=parseFloat(document.getElementById("amount").value),o=document.getElementById("content"),u=e.results,i=Object.values(u),c=r*i[0].val;c=c.toFixed(2),console.log(i,c,r,o),""!==c&&(o.innerHTML='\n          <h1>DX Currency Converter</h1>\n          <p><span class="amtInput">'+r+" "+t+' =</span><br>\n            <span class="amtval">'+c+" "+n+'</span><br>\n            <span class="fromcurr">'+t+'</span> <i class="fas fa-arrows-alt-h"></i> <span class="tocurr">'+n+'</span><br>\n            <span class="rate">1 '+t+" = "+i[0].val+" "+n+"</span>\n          </p>\n          ")}}]),e}();t.default=o}]);