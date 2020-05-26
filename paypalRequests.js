const request = require('request');

var token = '';

function refreshToken(callback) {

    var options = {
        'method': 'POST',
        'url': 'https://api.sandbox.paypal.com/v1/oauth2/token',
        'headers': {
            'Authorization': 'Basic QVJ3MmhaLUdjSVJ2Wk1vbkMzbWowajlkTVJBM1diLTNtNmc2Ym1YUW5xVE44aXBqSnotdlpjZ3g3cjk2U2tEQzBQMjFsWTl4SVdiYUZQQXA6RUIxRGFNTG1ldDA2UGh5Rk9GV09qRE03bTN3ZFhIeFQyLVZBNGs3RGlfWkRPSHdXZlBnV2tZbGdONGlyWDdaWlBoTkpTWGZkdjY1TUc4dk8=',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'LANG=en_US%3BUS; x-pp-s=eyJ0IjoiMTU5MDQ1MTI3OTQyMyIsImwiOiIwIiwibSI6IjAifQ; tsrce=devdiscoverynodeweb; ts=vr%3D4e4895f8172ac120001988effff0cdf0%26vreXpYrS%3D1685122056%26vteXpYrS%3D1590453079%26vt%3D4e48961a172ac120001988effff0cdef'
        },
        form: {
            'grant_type': 'client_credentials'
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        var body = JSON.parse(response.body);
        token = body.acces_token;
        return callback();
    });

}

function postPagamento(products, callback) {

    var body = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [
            {
                "amount": {
                    "total": "30.11",
                    "currency": "USD",
                    "details": {
                        "subtotal": "30.00",
                        "tax": "0.07",
                        "shipping": "0.03",
                        "handling_fee": "1.00",
                        "shipping_discount": "-1.00",
                        "insurance": "0.01"
                    }
                },
                "description": "The payment transaction description.",
                "custom": "EBAY_EMS_90048630024435",
                "invoice_number": "48787589673",
                "payment_options": {
                    "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                },
                "soft_descriptor": "ECHI5786786",
                "item_list": {
                    "items": [
                        {
                            "name": "hat",
                            "description": "Brown hat.",
                            "quantity": "5",
                            "price": "3",
                            "tax": "0.01",
                            "sku": "1",
                            "currency": "USD"
                        },
                        {
                            "name": "handbag",
                            "description": "Black handbag.",
                            "quantity": "1",
                            "price": "15",
                            "tax": "0.02",
                            "sku": "product34",
                            "currency": "USD"
                        }
                    ],
                    "shipping_address": {
                        "recipient_name": "Brian Robinson",
                        "line1": "4th Floor",
                        "line2": "Unit #34",
                        "city": "San Jose",
                        "country_code": "US",
                        "postal_code": "95131",
                        "phone": "011862212345678",
                        "state": "CA"
                    }
                }
            }
        ],
        "note_to_payer": "Contact us for any questions on your order.",
        "redirect_urls": {
            "return_url": "https://example.com/return",
            "cancel_url": "https://example.com/cancel"
        }
    };

    var options = {
        'method': 'POST',
        'url': 'https://api.sandbox.paypal.com/v1/payments/payment',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Cookie': 'LANG=en_US%3BUS; x-pp-s=eyJ0IjoiMTU5MDQ1MTI3OTQyMyIsImwiOiIwIiwibSI6IjAifQ; tsrce=devdiscoverynodeweb; ts=vr%3D4e4895f8172ac120001988effff0cdf0%26vreXpYrS%3D1685122056%26vteXpYrS%3D1590453079%26vt%3D4e48961a172ac120001988effff0cdef'
        },
        body: JSON.stringify(body)

    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        return callback(response.body);
    });

}

module.exports.refreshToken = refreshToken;
module.exports.postPagamento = postPagamento;