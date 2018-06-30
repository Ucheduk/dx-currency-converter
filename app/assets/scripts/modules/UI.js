
class UI {
  constructor() {
    this.fromVal = document.getElementById('fromVal');
    this.toVal = document.getElementById('toVal');
    this.from = document.getElementById('fromVal').value;
    this.to = document.getElementById("toVal").value;
  }


  getCurrencyVal(data) {
    
    let from = document.getElementById('fromVal').value;
    let to = document.getElementById("toVal").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let amtVal = document.getElementById('content');

      let obj = data.results
      let result = Object.values(obj);
      let amt = amount * result[0].val;
      amt = amt.toFixed(2);
      console.log(result, amt, amount, amtVal);
      if(amt !== '') {

          // Changing the DOM to show calculated result
          amtVal.innerHTML = `
          <h1>DX Currency Converter</h1>
          <p><span class="amtInput">${amount} ${from} =</span><br>
            <span class="amtval">${amt} ${to}</span><br>
            <span class="fromcurr">${from}</span> <i class="fas fa-arrows-alt-h"></i> <span class="tocurr">${to}</span><br>
            <span class="rate">1 ${from} = ${result[0].val} ${to}</span>
          </p>
          `;
          
      }
  }
}

export default UI;