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
//app.set('view engine', 'ejs');
app.set('view engine', 'pug');

app.get("/", function (request, response) {
    response.render('currency_dropdown', {
        Currency: data['Currency'],
    })
});

app.post("/currency_exchange" , function(request, response){
    response.render('currency_exchange',{
        currency_from: request.body.currency_from,
        currency_to: request.body.currency_to,
        amount: request.body.amount,
        rate: 20
    })
})

app.get("")

app.listen(3000)
console.log("Your application is running in port 3000")
