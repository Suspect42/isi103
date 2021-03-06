const express = require('express');

const app = express();
const port = process.env.PORT;

const verifyRoute = require('./routes');
const carrinho = require('./carrinho');
const jasminRequests = require('./jasminRequests');
const moloniRequests = require('./moloniRequests');
const qrcodeRequests = require('./qrcode');

var bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET 

app.get('/', function (req, res) {
    res.send('API');
});

//GET QRCODE

app.get('/api/fatura/qrcode', function(req, res){
    qrcodeRequests.getQRCode(function(qrcode){
        res.send(qrcode);
    });
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

app.get('/api/carrinho', function (req, res) {
    res.send(carrinho.getArtigos());
});

//POST CARRINHO

app.post('/api/carrinho', function (req, res) {
    carrinho.setArtigos(req.body, function () {
        res.send('Artigos adicionados ao carrinho!');
        console.log(carrinho.getArtigos())
    });
});

//POST RESET CARRINHO

app.post('/api/carrinho/reset', function (req, res) {
    carrinho.resetCarrinho(function () {
        res.send('O carrinho está vazio!');
    });
});

//GET FATURA

app.get('/api/fatura', function(req, res){
    jasminRequests.refreshToken(function(){
        jasminRequests.getFatura2(function(fatura){
            qrcodeRequests.setFA(fatura);
            //console.log(fatura);
            res.send(fatura);
        });
    });
})

//POST FATURA

app.post('/api/fatura', function (req, res) {
    var body = req.body;

    jasminRequests.refreshToken(function () {
        jasminRequests.postFatura(body, function (data) {
            jasminRequests.getFatura(data, function (data) {
                res.send(data);
                moloniRequests.refreshToken(function () {
                    moloniRequests.postFatura(body, function (data) {
                        moloniRequests.postFatura2(data, function(data){
                            //res.send(data);
                        })
                    });
                });
            });
        });
    });
});

//LISTEN

app.listen(port, function () {
    console.log('Server running on port ' + port);
});