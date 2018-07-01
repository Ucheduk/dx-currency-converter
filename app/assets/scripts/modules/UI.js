
class UI {
  constructor() {
    this.fromVal = document.getElementById('fromVal');
    this.toVal = document.getElementById('toVal');
    this.from = document.getElementById('fromVal').value;
    this.to = document.getElementById("toVal").value;
  }


  // Gets qurey data from IndexController
  getCurrencyVal(data) {
    
    let from = document.getElementById('fromVal').value;
    let to = document.getElementById("toVal").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let amtVal = document.getElementById('content');

      let obj = data.results
      let result = Object.values(obj);

      // Calculates the result of the amount to convert
      let amt = amount * result[0].val;
      amt = amt.toFixed(2);
      if (document.getElementById("amount").value !== '') {
        if(amt !== '') {

            // Changing the DOM to show calculated result
            amtVal.innerHTML = `
            <h1>Currency Converter</h1>
            <p><span class="amtInput">${amount} ${from} =</span><br>
              <span class="amtval">${amt} ${to}</span><br>
              <span class="fromcurr">${from}</span> <i class="fas fa-arrows-alt-h"></i> <span class="tocurr">${to}</span><br>
              <span class="rate">1 ${from} = ${result[0].val} ${to}</span>
            </p>
            `;
            
        }
      }
      document.getElementById("amount").value = ' ';
  }
}

export default UI;