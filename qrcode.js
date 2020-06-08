const request = require('request');

var FA = '';

function setFA(fa){
    FA = fa;
}

function getQRCode(callback) {
    var options = {
        'method': 'GET',
        'url': 'http://api.qrserver.com/v1/create-qr-code/?data=' + JSON.stringify(FA) + '&size=300x300',
        'headers': {
            'Accept' : 'image/png'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        return callback(response.body)
    });
}

module.exports.setFA = setFA;
module.exports.getQRCode = getQRCode;