class CacheData {

  constructor(data) {
    this.millisecondsToLive = 10000;
    this.cache = data;
    this.getData = this.getData.bind(this);
    this.isCacheExpired = this.isCacheExpired.bind(this);
    this.fetchDate = new Date();
  }

  isCacheExpired() {

    return (this.fetchDate.getTime() + this.millisecondsToLive) < new Date().getTime();
  }
  getData() {
      if (this.isCacheExpired()) {
        return null;
      } else {
        return this.cache;
      }
    }
}

module.exports = CacheData
