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
            'client_secret': 'c2ce0e1c-6da9-4b40-982a-94d90faae1a2',
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
        'method': 'GET',
        'url': 'https://my.jasminsoftware.com/api/236215/236215-0001/salesCore/salesItems',
        'headers': {
            'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE1OTAxNTgzNTAsImV4cCI6MTU5MDE3Mjc1MCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiSVNJRzEwMyIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.jDEBP3ynYa7o6wctOkdvHlYlS89GL_vP-L9LGR2JhdJ-epaBV9B1u5wMVUDhtvzF0CReLzp-bGJtbt32TQWfq2FqgrvCUkCAJd_HWTRyzf7fHtL6YpMWDLKsuakufa-fY7Kn0NxCCZ_2dOpvsv8XOgE_SIBh65w3nxUkc30PuMXuA0OeI1WaKk3ch6jECdbwxtwslcxX6mp5QcQzCNxIY0gcLYnbrvU9PGFd5um7sDNCKNG767ldsW_uIAe3Hf60A2o2CCEn4W3_jAKB_8gNx_LNzgHQCTzaYS6Y7bjmST3muvMbhFS58hcHN505uSbgjDc7lwukk4VYqVRwtNWvIw',
            'Content-Type': 'application/json',
            'Cookie': 'OpenIdConnect.nonce.7904W8unm5ZWzN5pm48zFnwo%2FW%2BuBIIIMX2yiVDRZFw%3D=aWVnSlRrYkhmLWtYTVdpeUk1cDJxa0toV1BMOFBLMFd0VWFNaXRkNzY1bk5kVy1EOUZwWWhfVFl0WG8xa2xMUVdRUmlnYng0M2hSYzZqbGhxcUhPZExmZlF3QlZJUy1hSTExZnNBX0k0THVsRzVPMEQ5NmYxR2tBUy0zWGFxcGluV0NNM3ZETDVKZGtSaXpCanQzbkpLcTFOTjdsMG9ZaXl1dVFXUkFpWWkwS1lwNk53V0tSRUxhWDNPSDVKVktFVTBuSVM0cTVSTmxNUkt2empDdFRqUktpLUpz; OpenIdConnect.nonce.pgcVtzNvKR4JSWRshFZ%2B%2B5r%2BgsS999EALAGFSreSARA%3D=Mml2TlhYREhLRmZoZi1RNER1UEpvenIzdXZNelhSbE54X0ZJU3VNMnJqeTdiOHBCb1BRWkVjZjBFZUN1MjdxajdmMkJub2hSNndZWTdYaXQwbXlkMkt5SU5hUFJybVdPX3R0ekM4aGs1SnlhbW9VaDdDd1V6T1hHLUVLU25SbkJhbVpOVWc4UktpdkpLc2ZOU0FpaEFPcHJsY3A1bVpMbnVDOEt4YldsVEw0Ujl6R3duMXNZcWRYUU5RSGRoWHpLbjNWN252Y3ctbk10RThFYlRhd2dWQ0RqVVdv; OpenIdConnect.nonce.4v%2BXdptgd43p8YH9j6hhqFIMH8VWjPyBpcXnXjVrzoU%3D=YTVFbDBCcXRTT1VqTFVKbzVSQXJlbFpISjF0RlJrc0RLNXlUMm5NeXd3V1Bfb0h1OTFXcWgzdzRtX0JsVHZ1aGtTT1pfeGdDLXZNWU4zRVhQTE9Rd3J2cmhTcW5NeGZ5UF9URTQ3bHhjMUF0M05URUFGc3kxNEFRR05qNTBWVEJVOTZzX3hSMDNTYlIweFNlRVdWdm5OZkR5NmJTSktpVGNaVm1BcVZRWWUzcXZ2X2REX3JHUjNURk1IVktTbmxBZDh4MXloeUt6eGxkdGd3cFhFdjdRZnRxZEtV'
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        body = JSON.parse(response.body);
        for (i in body) {
            product = {
                itemKey: body[i].itemKey,
                price: body[i].priceListLines[0].priceAmount.amount
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