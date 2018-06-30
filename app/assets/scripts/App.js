/**
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

import IndexController from './modules/IndexController';
import Currency from './modules/Currency';
import UI from './modules/UI';

const currency = new Currency();
const ui = new UI();

// Check if ServiceWorker enabled 
if ('serviceWorker' in navigator) {

  // Register ServiceWorker
  navigator.serviceWorker
    .register('./Sw.js')
    .then((reg) => {
      console.log('[ServiceWorker Registered]', reg);
    })
    .catch((err) => console.log('[ServiceWorker Registered Failed]', err));

}

// Event on convert btn click
document.addEventListener('click', convertCurrency);
function convertCurrency(e) {
  if(e.target.classList.contains('convertBtn')) {
    console.log(e.target)
    
    let from = document.getElementById('fromVal').value;
    let to = document.getElementById("toVal").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let indexCtrl = new IndexController(from, to, amount);

    // Display the calculated data
    indexCtrl.get()
    .then(data => {
      ui.getCurrencyVal(data);
      console.log(data, e)
    })
    .catch(err => console.log(err));     
  } 
  e.preventDefault();
}