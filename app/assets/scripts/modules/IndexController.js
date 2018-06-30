
class IndexController {
    constructor(from, to, amount) {
        this.url = 'https://free.currencyconverterapi.com/api/v5/';
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

    // Gets the qurey data from the API
    get() {
        let qurey = `${this.from}_${this.to}`
        return new Promise((resolve, reject) => {
            fetch(`${this.url}convert?q=${qurey}`)
            .then(res => res.json())
            .then(data => {
                resolve(data)
            })
            .catch(err => reject(err));

            return qurey;
          });
    }
    
      
}
export default IndexController;