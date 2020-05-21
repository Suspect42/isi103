const request = require('request');
var options;
var token;
var body;

function refreshToken(callback) {

    options = {
        method: 'POST',
        url: 'https://identity.primaverabss.com/core/connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'client_id': 'ISIG103',
            'client_secret': 'ce99dbc0-6cdf-4bf9-b3e2-44b072056edb',
            'grant_type': 'client_credentials',
            'scope': 'application'
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        body = JSON.parse(response.body);
        token = body.access_token;
        console.log('OAuth 2.0 Jasmin Token Updated!');
        return callback();
    });

}

function getBaree(callback) {

    var products = [];
    var product = '';
    var bar = '';

    options = {
        method: 'GET',
        url: 'https://my.jasminsoftware.com/api/234480/234480-0001/materialsCore/materialsItems',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        body = JSON.parse(response.body);
        for (i in body) {
            product = {
                description: body[i].description
            };
            products.push(product);
        };

        bar = {
            campus: 'Campus de Azurem',
            name: 'Bar da Escola de Engenharia',
            products: products
        };

        return callback(bar);
    });

}

module.exports.getBaree = getBaree;
module.exports.refreshToken = refreshToken;