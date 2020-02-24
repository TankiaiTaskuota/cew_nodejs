class Validate {

  constructor(from, to, amount){
    this.from = from;
    this.to = to;
    this.amount = amount;
  }

  isValid() {
    const data = require('./../data/data.json')

    const isValidCurency = curr => {

      if(typeof curr !== 'undefined' && data['Currency'].indexOf(curr) > -1 ) return true;
      throw new Error(`Currency: ${curr} is invalid.`);
    }

    const isValidAmount = amount => {
      if(typeof amount !== 'undefined' && /^(\d+)$/.test(amount)) return true;
      throw new Error(`Amount: ${amount} is invalid.`);
    }

    if(isValidCurency(this.from) && isValidCurency(this.to) && isValidAmount(this.amount)) return true;
    else return false;
  }
}

module.exports = Validate
