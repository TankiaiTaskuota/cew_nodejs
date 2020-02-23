var express = require('express'),
    app = express(),
    pug = require('pug'),
    spawn = require('child_process').spawn, child,
    data = require('./data/data.json'),
    path = require('path'),
    bodyparser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const Exchange = require('./modules/exchange.js');
const Validate = require('./modules/validate.js');
const CacheData  = require('./modules/cache_data.js');

let cache = {};


app.get("/", function (request, response) {
    response.render('currency_dropdown', {
        Currencies: data['Currency'],
    })
});

app.get('/quote/:base_currency/:quote_currency/:base_amount', function(req, res) {
  let from = req.params.base_currency,
      to = req.params.quote_currency,
      amount = req.params.base_amount;

  let isValidInput = new Validate(from, to, amount).isValid()

  if(isValidInput) {
    cached_data = cache[from+to];
    if(cached_data != null){
        res.send(cached_data.getData())
    } else{
      new Exchange(from, to).convert()
        .then(function(result){
          cache[from+to] = new CacheData({ quote_amount: amount * result, exchange_rate: result });
          res.send({ quote_amount: amount * result, exchange_rate: result });
        })
        .catch((error) => res.send({ error: error }));
      }
    } else {
      res.send({ error: error });
    }
});

app.get("")


app.listen(3000)
console.log("Your application is running in port 3000")
