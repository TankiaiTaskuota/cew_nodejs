class Rate {

  constructor(from, to, amount, cache) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.cache = cache;
    this.key = from+to;
    this.getData = this.getData.bind(this);
  }

  getData(cacheOld) {
    const Exchange = require('./exchange.js');
    const Validate = require('./validate.js');
    const CacheData  = require('./cache_data.js');

    let isValidInput = new Validate(this.from, this.to, this.amount).isValid()

    if(isValidInput) {
      let cached_data = this.cache[this.key];
      let key = this.key;
      let cache = this.cache;

      if(cached_data == null || cached_data.getData() == null){
        return new Exchange(this.from, this.to).convert()
          .then(function(result){
            cache[key] = new CacheData({ exchange_rate: result });
          })
          .catch((error) => console.log({ error: error }));
        } else {
          return Promise.resolve('Success_cache').then(function(value) {
            return 1;
          });
        }
      }
  }

}
  module.exports = Rate
