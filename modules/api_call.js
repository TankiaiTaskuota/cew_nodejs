const https = require('https');

class ApiCall {

  constructor(url){
    this.url = url;
  }

  send() {
    console.log('this.url', this.url);
        return new Promise((resolve, reject) => {
            https.get(this.url, (resp) => {

            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
              data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              resolve(data);
            });

          }).on("error", (err) => {
            reject("Error: " + err.message);
            });
        })
    }

}

module.exports = ApiCall
