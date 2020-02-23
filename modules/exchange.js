
const ApiCall = require('./api_call.js');

class Exchange {

  constructor(from, to){
    this.from = from;
    this.to = to;
    this.url = `https://api.exchangeratesapi.io/latest?base=${from}`;
  }


  convert() {

    const sendApiRequest = new ApiCall(this.url);

    const jsonParse = data => {
            const value = JSON.parse(data)["rates"][this.to];

            if (typeof value !== 'undefined') return value;
            else return `Currency not found: ${value}`
        };

    return sendApiRequest.send()
            .then((result) => {
                const response = jsonParse(result);
                if(isNaN(response)) return 'Could not return currency.';
                else return response
            });
  }

}

module.exports = Exchange
