import IndexController from './modules/IndexController';
import Currency from './modules/Currency';
import UI from './modules/UI';

const currency = new Currency();

if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./Sw.js')
    .then((reg) => {
      console.log('[ServiceWorker Registered]', reg);
    })
    .catch((err) => console.log('[ServiceWorker Registered Failed]', err));

}

class App {

  constructor() {
    this.ui = new UI();
    // this.registerServiceWorker();
    this.event();
  }

  // registerServiceWorker() {

  //   if ('serviceWorker' in navigator) {

  //     navigator.serviceWorker
  //       .register('./Sw.js')
  //       .then((reg) => {
  //         console.log('[ServiceWorker Registered]', reg);
  //       })
  //       .catch((err) => console.log('[ServiceWorker Registered Failed]', err));

  //   }
  // }

  event() {
    // Event on convert btn click
    document.addEventListener('click', this.convertCurrency(e));
  }


  convertCurrency(e) {
    if(e.target.classList.contains('convertBtn')) {
      const from = document.getElementById('fromVal').value;
      const to = document.getElementById("toVal").value;
      let amount = parseFloat(document.getElementById("amount").value);
      const indexCtrl2 = new IndexController(from, to, amount);

      // Display the calculated data
      indexCtrl2.get()
      .then(data => {
        this.ui.getCurrencyVal(data);
      })
      .catch(err => console.log(err));     
    } 
    
      e.preventDefault();
  }
}

export default App;

