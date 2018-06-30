import idb from 'idb';

class Currency {
    constructor() {
        this.url = 'https://free.currencyconverterapi.com/api/v5/currencies';
        this.fromVal = document.getElementById('fromVal');
        this.toVal = document.getElementById('toVal');
        this.getCurrencies();
        this.dbPromise();
    }

    dbPromise() {
        // If the browser doesn't support service worker,
        // we don't care about having a database
        if (!navigator.serviceWorker) {
          return Promise.resolve();
        }
    
        return idb.open('dx', 1, function(upgradeDb) {
          let store = upgradeDb.createObjectStore('dx', {
            keyPath: 'id'
          });
          console.log("Store Created")
        });
      }
    
    // Gets all currencies from the currencies API
    // and display in select input
    getCurrencies() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}`)
            .then(res => res.json())
            .then(data => {
                resolve(data)

                let currencies = data.results;

                this.dbPromise().then(db => {
                if (!db) return;

                const tx = db.transaction('dx', 'readwrite');
                const store = tx.objectStore('dx');
                for (const key in currencies) {
                    if (currencies.hasOwnProperty(key)) {
                        const currency = currencies[key]

                        // Adds currency data to IndexedDB
                        store.put(currency);
                        this.fromVal.innerHTML += `<option value="${currency.id}">${currency.id} (${currency.currencyName})</option>`;
                        this.toVal.innerHTML += `<option value="${currency.id}">${currency.id} (${currency.currencyName})</option>`;
                    }
                }
                document.getElementById("fromVal").selectedIndex = "8";
                document.getElementById("toVal").selectedIndex = "72";
                })
                
            })
            .catch(err => reject(err));
          });
    }
   

}

export default Currency;

let currency = new Currency();

currency.dbPromise();