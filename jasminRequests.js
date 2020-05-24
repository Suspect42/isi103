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
            'client_secret': '58ca3f66-6e0d-4972-b0c5-f3851ce12dde',
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
        'url': 'https://my.jasminsoftware.com/api/236218/236218-0001/salesCore/salesItems',
        'headers': {
            'Authorization': 'bearer ' + token,
            'Content-Type': 'application/json',
            'Cookie': 'OpenIdConnect.nonce.7904W8unm5ZWzN5pm48zFnwo%2FW%2BuBIIIMX2yiVDRZFw%3D=aWVnSlRrYkhmLWtYTVdpeUk1cDJxa0toV1BMOFBLMFd0VWFNaXRkNzY1bk5kVy1EOUZwWWhfVFl0WG8xa2xMUVdRUmlnYng0M2hSYzZqbGhxcUhPZExmZlF3QlZJUy1hSTExZnNBX0k0THVsRzVPMEQ5NmYxR2tBUy0zWGFxcGluV0NNM3ZETDVKZGtSaXpCanQzbkpLcTFOTjdsMG9ZaXl1dVFXUkFpWWkwS1lwNk53V0tSRUxhWDNPSDVKVktFVTBuSVM0cTVSTmxNUkt2empDdFRqUktpLUpz; OpenIdConnect.nonce.pgcVtzNvKR4JSWRshFZ%2B%2B5r%2BgsS999EALAGFSreSARA%3D=Mml2TlhYREhLRmZoZi1RNER1UEpvenIzdXZNelhSbE54X0ZJU3VNMnJqeTdiOHBCb1BRWkVjZjBFZUN1MjdxajdmMkJub2hSNndZWTdYaXQwbXlkMkt5SU5hUFJybVdPX3R0ekM4aGs1SnlhbW9VaDdDd1V6T1hHLUVLU25SbkJhbVpOVWc4UktpdkpLc2ZOU0FpaEFPcHJsY3A1bVpMbnVDOEt4YldsVEw0Ujl6R3duMXNZcWRYUU5RSGRoWHpLbjNWN252Y3ctbk10RThFYlRhd2dWQ0RqVVdv; OpenIdConnect.nonce.4v%2BXdptgd43p8YH9j6hhqFIMH8VWjPyBpcXnXjVrzoU%3D=YTVFbDBCcXRTT1VqTFVKbzVSQXJlbFpISjF0RlJrc0RLNXlUMm5NeXd3V1Bfb0h1OTFXcWgzdzRtX0JsVHZ1aGtTT1pfeGdDLXZNWU4zRVhQTE9Rd3J2cmhTcW5NeGZ5UF9URTQ3bHhjMUF0M05URUFGc3kxNEFRR05qNTBWVEJVOTZzX3hSMDNTYlIweFNlRVdWdm5OZkR5NmJTSktpVGNaVm1BcVZRWWUzcXZ2X2REX3JHUjNURk1IVktTbmxBZDh4MXloeUt6eGxkdGd3cFhFdjdRZnRxZEtV'
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        body = JSON.parse(response.body);
        for (i in body) {
            if (body[i].itemKey == 'PORTES') { } else {
                product = {
                    itemKey: body[i].itemKey,
                    price: body[i].priceListLines[0].priceAmount.amount
                };
                products.push(product);
            }
        };
        bar = {
            campus: 'Campus de Azurem',
            name: 'Bar da Escola de Engenharia',
            products: products
        };
        return callback(bar);
    });

}

function postFatura(products, callback) {

    var product = '';
    var invoiceProducts = [];

    for (i in products) {
        product = {
            salesItem: products[i].itemKey,
            description: products[i].description,
            quantity: products[i].qty,
            unitPrice: {
                amount: products[i].price,
                baseAmount: products[i].price,
                reportingAmount: products[i].price,
                fractionDigits: 2,
                symbol: "€"
            },
            unit: "UN",
            itemTaxSchema: "NORMAL",
            deliveryDate: timeNow()
        }

        invoiceProducts.push(product);
    }

    //var body = "{\n    \"documentType\": \"FA\",\n    \"serie\": \"2020\",\n    \"seriesNumber\": 1,\n    \"company\": \"ISI\",\n    \"paymentTerm\": \"01\",\n    \"paymentMethod\": \"NUM\",\n    \"currency\": \"EUR\",\n    \"documentDate\": \"" + timeNow() + "\",\n    \"postingDate\":" + timeNow() + " \",\n    \"buyerCustomerParty\": \"INDIF\",\n    \"buyerCustomerPartyName\": \"Cliente Indiferenciado\",\n    \"accountingPartyName\": \"Cliente Indiferenciado\",\n    \"exchangeRate\": 1,\n    \"discount\": 0,\n    \"loadingCountry\": \"PT\",\n    \"unloadingCountry\": \"PT\",\n    \"isExternal\": false,\n    \"isManual\": false,\n    \"isWsCommunicable\": false,\n    \"documentLines\":" + JSON.stringify(invoiceProducts) + " \ \n }";

    //console.log(body);

    options = {
        'method': 'POST',
        'url': 'https://my.jasminsoftware.com/api/236218/236218-0001/billing/invoices/',
        'headers': {
            'Authorization': 'bearer ' + token,
            'Content-Type': 'application/json',
            'Cookie': 'OpenIdConnect.nonce.7904W8unm5ZWzN5pm48zFnwo%2FW%2BuBIIIMX2yiVDRZFw%3D=aWVnSlRrYkhmLWtYTVdpeUk1cDJxa0toV1BMOFBLMFd0VWFNaXRkNzY1bk5kVy1EOUZwWWhfVFl0WG8xa2xMUVdRUmlnYng0M2hSYzZqbGhxcUhPZExmZlF3QlZJUy1hSTExZnNBX0k0THVsRzVPMEQ5NmYxR2tBUy0zWGFxcGluV0NNM3ZETDVKZGtSaXpCanQzbkpLcTFOTjdsMG9ZaXl1dVFXUkFpWWkwS1lwNk53V0tSRUxhWDNPSDVKVktFVTBuSVM0cTVSTmxNUkt2empDdFRqUktpLUpz; OpenIdConnect.nonce.pgcVtzNvKR4JSWRshFZ%2B%2B5r%2BgsS999EALAGFSreSARA%3D=Mml2TlhYREhLRmZoZi1RNER1UEpvenIzdXZNelhSbE54X0ZJU3VNMnJqeTdiOHBCb1BRWkVjZjBFZUN1MjdxajdmMkJub2hSNndZWTdYaXQwbXlkMkt5SU5hUFJybVdPX3R0ekM4aGs1SnlhbW9VaDdDd1V6T1hHLUVLU25SbkJhbVpOVWc4UktpdkpLc2ZOU0FpaEFPcHJsY3A1bVpMbnVDOEt4YldsVEw0Ujl6R3duMXNZcWRYUU5RSGRoWHpLbjNWN252Y3ctbk10RThFYlRhd2dWQ0RqVVdv; OpenIdConnect.nonce.4v%2BXdptgd43p8YH9j6hhqFIMH8VWjPyBpcXnXjVrzoU%3D=YTVFbDBCcXRTT1VqTFVKbzVSQXJlbFpISjF0RlJrc0RLNXlUMm5NeXd3V1Bfb0h1OTFXcWgzdzRtX0JsVHZ1aGtTT1pfeGdDLXZNWU4zRVhQTE9Rd3J2cmhTcW5NeGZ5UF9URTQ3bHhjMUF0M05URUFGc3kxNEFRR05qNTBWVEJVOTZzX3hSMDNTYlIweFNlRVdWdm5OZkR5NmJTSktpVGNaVm1BcVZRWWUzcXZ2X2REX3JHUjNURk1IVktTbmxBZDh4MXloeUt6eGxkdGd3cFhFdjdRZnRxZEtV; ASP.NET_SessionId=gsoh2xuam0pjoy04gm0tmh51; OpenIdConnect.nonce.1oc5U3CNLdfXDl%2F%2BEE23ZYsBLxiuFUxKM6e9pWth%2FD8%3D=QWJCTThnUmdSNHFSaW0zLXRkZDdCcnVrMFNOb1VKa0lSczh5VHcxTFhaZFlvbU1oV3UxVVVHSzFHdmJITVZsVUxqTFB0UWNqa1JDWnJuTmZEZTlPNlBWc2xwdWtoOUFhQ3hNSDRJVWYtSUl0MGc1UmR0RGs5X3FodXNNMXRpZ093SWRmbzBXdlphY0FBNEZkdHAtc1QzVjJzT2hsSjgtSlRpWGVNN1NXNE5tSWluUDU4a1pQd3liX0ZXcUwtZlRUQVNUUjZuYlRtczdZS05nWnN2d19ZbWFhd2Vn'
        },
        'body': "{\n    \"documentType\": \"FA\",\n    \"serie\": \"2020\",\n    \"seriesNumber\": 1,\n    \"company\": \"ISI\",\n    \"paymentTerm\": \"01\",\n    \"paymentMethod\": \"NUM\",\n    \"currency\": \"EUR\",\n    \"documentDate\": \"" + timeNow() + "\",\n    \"postingDate\"\":" + timeNow() + " \"\",\n    \"buyerCustomerParty\": \"INDIF\",\n    \"buyerCustomerPartyName\": \"Cliente Indiferenciado\",\n    \"accountingPartyName\": \"Cliente Indiferenciado\",\n    \"exchangeRate\": 1,\n    \"discount\": 0,\n    \"loadingCountry\": \"PT\",\n    \"unloadingCountry\": \"PT\",\n    \"isExternal\": false,\n    \"isManual\": false,\n    \"isWsCommunicable\": false,\n    \"documentLines\":" + JSON.stringify(invoiceProducts) + "\n }"
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        return callback(response.body);
    });

}

function timeNow() {
    var today = new Date();
    var oneMonth;

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    mm += 1;
    oneMonth = yyyy + '-' + mm + '-' + dd;

    return today;
}


module.exports.postFatura = postFatura;
module.exports.getBaree = getBaree;
module.exports.refreshToken = refreshToken;