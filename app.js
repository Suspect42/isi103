const express = require('express');

const app = express();
const port = process.env.PORT;

const verifyRoute = require('./routes');
const jasminRequests = require('./jasminRequests');
const moloniRequests = require('./moloniRequests');

var bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET

app.get('/', function (req, res) {
    res.send('API');
});

app.get('/api/:id', function (req, res) {
    const id = req.params.id;
    res.send(verifyRoute.verifyRoute1(id));
});

//GET PRODUTOS

app.get('/api/:id1/:id2', function (req, res) {
    const id1 = req.params.id1;
    const id2 = req.params.id2;

    verifyRoute.verifyRoute2(id1, id2, function () {
        jasminRequests.refreshToken(function () {
            jasminRequests.getBaree(function (data) {
                res.send(data);
            });
        });
    });
});

//POST FATURA

app.post('/api/faturacao', function (req, res) {
    var body = req.body;
    //console.log(body);

    jasminRequests.postFatura(body, function (data){
        res.send(data);
    });
});

//LISTEN

app.listen(port, function () {
    console.log('Server running on port ' + port);
});