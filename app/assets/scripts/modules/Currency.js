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
          console.log("Store Created", store)
          // store.createIndex('by-date', 'time');
        });
      }

    getCurrencies() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}`)
            .then(res => res.json())
            .then(data => {
                resolve(data)

                let msgs = data.results;

                this.dbPromise().then(db => {
                if (!db) return;

                const tx = db.transaction('dx', 'readwrite');
                const store = tx.objectStore('dx');
                for (const key in msgs) {
                    if (msgs.hasOwnProperty(key)) {
                        const msg = msgs[key]
                        store.put(msg);
                        console.log('Currencies added', msg)
                        this.fromVal.innerHTML += `<option value="${msg.id}">${msg.id} (${msg.currencyName})</option>`;
                        this.toVal.innerHTML += `<option value="${msg.id}">${msg.id} (${msg.currencyName})</option>`;
                    }
                }
                document.getElementById("fromVal").selectedIndex = "8";
                document.getElementById("toVal").selectedIndex = "72";
                })

                // let currencies = msgs;
                // console.log(currencies);
                // for (const key in currencies) {
                // if (currencies.hasOwnProperty(key)) {
                //     const element = currencies[key];
                //     this.fromVal.innerHTML += `<option value="${element.id}">${element.id} (${element.currencyName})</option>`;
                //     this.toVal.innerHTML += `<option value="${element.id}">${element.id} (${element.currencyName})</option>`;
                //     console.log('option value', element); 
                // }
                // }
                
            })
            .catch(err => reject(err));
          });
    }
   

}

export default Currency;

let currency = new Currency();

currency.dbPromise();