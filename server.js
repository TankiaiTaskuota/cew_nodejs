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

const Rate  = require('./modules/rate.js');

const formatedResponse = (amount, rate) => {
  return { quote_amount: roundValue(amount * rate), exchange_rate: roundValue(rate) }
};

const roundValue = value => {
   return (Math.round(value * 100)/100).toFixed(3);
}

let cache = {};

app.get("/", function (request, response) {
    response.render('currency_dropdown', {
        Currencies: data['Currency'],
    })
});

// app.get('/quote/:base_currency/:quote_currency/:base_amount', function(req, res) {
//   let from = req.params.base_currency,
//       to = req.params.quote_currency,
//       amount = req.params.base_amount;
//
//   new Rate(from, to, amount, cache).getData().then((result) => {
//     res.send(formatedResponse(amount, cache[from+to].getData().exchange_rate));
//   });
// });

app.get('/quote', function(req, res) {
  let from = req.query.base_currency,
      to = req.query.quote_currency,
      amount = req.query.base_amount;

  new Rate(from, to, amount, cache).getData().then((result) => {
    res.send(formatedResponse(amount, cache[from+to].getData().exchange_rate));
  });
});

app.get("")


app.listen(3000)
console.log("Your application is running in port 3000")
