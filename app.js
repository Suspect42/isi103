const express = require('express');

const app = express();
const port = process.env.PORT;

const verifyRoute = require('./routes');
const carrinho = require('./carrinho');
const jasminRequests = require('./jasminRequests');
//const paypalRequests = require('./paypalRequests');
//const moloniRequests = require('./moloniRequests');

var bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET 

app.get('/', function (req, res) {
    res.send('API');
});

//GET PRODUTOS

app.get('/api/:id1/:id2', function (req, res) {
    const id1 = req.params.id1;
    const id2 = req.params.id2;

    verifyRoute.verifyRoute(id1, id2, function () {
        jasminRequests.refreshToken(function () {
            jasminRequests.getBaree(function (data) {
                res.send(data);
            });
        });
    });
});

//GET CARRINHO

app.get('/api/carrinho', function(req, res){
    res.send(carrinho.artigos);
});

//POST ARTIGO CARRINHO

app.post('/api/carrinho/artigo', function(req, res){
    carrinho.putArtigo(req.body, function(){
        res.send(req.body.itemKey + ' adicionado ao carrinho!');
    });
});

//POST RESET CARRINHO

app.post('/api/carrinho/reset', function(req, res){
    carrinho.resetCarrinho(function(){
        res.send('O carrinho está vazio!');
    });
});

//POST FATURA

app.post('/api/fatura', function (req, res) {
    var body = req.body;

    jasminRequests.refreshToken(function () {
        jasminRequests.postFatura(body, function (data) {
            jasminRequests.getFatura(data, function (data) {
                res.send(data);
            });
        });
    });
});

//LISTEN

app.listen(port, function () {
    console.log('Server running on port ' + port);
});