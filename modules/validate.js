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
      //else return false;
      throw new Error(`Currency: ${curr} is invalid.`);
    }
    console.log(isValidCurency(this.from))
    if(isValidCurency(this.from) && isValidCurency(this.to) && typeof this.amount !== 'undefined') return true;
    else return false;
  }
}

module.exports = Validate
