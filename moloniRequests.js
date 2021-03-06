const request = require('request');
var token;
var body;

//REFRESH TOKEN

function refreshToken(callback) {
    var options = {
        'method': 'GET',
        'url': 'https://api.moloni.pt/v1/grant/?grant_type=password&client_id=grupo103isium&client_secret=18f124aa803549fa0d7de266e8c0bfb66b009811&username=daniel.faria20@hotmail.com&password=isigrupo1032020',
        'headers': {
            'Cookie': 'PHPSESSID=0muub01ag7akh7mjn2d0doh1t2'
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        body = JSON.parse(response.body);
        token = body.access_token;
        //console.log('OAuth 2.0 Moloni Token Updated!');
        return callback();
    });
};

//POST FATURA

function postFatura(products, callback) {

    getProducts(function (data) {
        var cont;

        for (p in products) {
            cont = 0;
            for (i in data) {
                if (data[i].name == products[p].itemKey) {
                    products[p] = {
                        product_id: data[i].product_id,
                        name: data[i].name,
                        summary: '',   
                        qty: products[p].qty,       
                        price: data[i].price,
                        discount: '0',
                        deduction_id: '0',
                        order: '1',
                        exemption_reason: 'M10',
                        payment_method_id: '575493',
                        value: ''
                    }
                    cont += 1;
                };
            };
            if (cont == 0) {
                postProduct(products[p].itemKey, products[p].price, function (data) {
                    products[p] = {
                        product_id: data.product_id,
                        name: products[p].itemKey,
                        summary: '',
                        qty: products[p].qty,
                        price: products[p].price,
                        discount: '0',
                        deduction_id: '0',
                        order: '1',
                        exemption_reason: 'M10',
                        payment_method_id: '575493',
                        value: ''
                    }
                });
            };
        };
        //console.log('MOLONI INVOICE PRODUCTS: ')
        //console.log(products);
        return callback(products);
    });
};

function postFatura2(products, callback){

    var invoiceProducts = JSON.stringify(products);
    //console.log('INVOICE PRODUCTS: ')
    //console.log(invoiceProducts);

    var today = new Date();
    var oneMonth;

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    mm = '07'

    oneMonth = yyyy + '-' + mm + '-' + dd;

    var options = {
        'method': 'POST',
        'url': 'https://api.moloni.pt/v1/invoiceReceipts/insert/?access_token=' + token,
        'headers': {
            'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
            'Cookie': 'PHPSESSID=rqt9oogc21lc504g58mhi6im83'
        },
        form: {
            'company_id': '128873',
            'date': today,
            'expiration_date': oneMonth,
            'maturity_date_id': '0',
            'document_set_id': '273360',
            'customer_id': '25484637',
            'alternate_address_id': '0',
            'our_reference': 'Nossa referência',
            'your_reference': 'Referência Cliente',
            'financial_discount': '0',
            'eac_id': '0',
            'salesman_id': '0',
            'salesman_commision': '0',
            'special_discount': '0',
            'exchange_currency_id': '0',
            'exchange_rate': '0',
            'notes': 'Documento de crédito',
            'status': '0',
            'net_value': '100',
            'products' : invoiceProducts,
            'exchange_currency_id': '77',
            'exchange_rate': '65.7932'
        }
    };
    
    //console.log('OPTIONS: ');
    //console.log(options);

    request(options, function (error, response) {
        if (error) throw new Error(error);
        body = JSON.parse(response.body);
        //console.log('MOLONI POST FATURA STATUS:');
        //console.log(body);
        return callback(body);
    });
}

//POST PRODUTO

function postProduct(name, price, callback) {
    var reference = 2;
    reference += 1;
    var options = {
        'method': 'POST',
        'url': 'https://api.moloni.pt/v1/products/insert/?access_token=' + token,
        'headers': {
            'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
            'Cookie': 'PHPSESSID=rqt9oogc21lc504g58mhi6im83'
        },
        form: {
            'company_id': '128873',
            'category_id': '2186789',
            'type': '1',
            'name': name,
            'summary': 'Uma descrição do artigo',
            'reference': 'REF' + reference,
            'ean': '',
            'price': price,
            'unit_id': '1141117',
            'has_stock': '1',
            'stock': '10',
            'minimum_stock': '0',
            'pos_favorite': '0',
            'at_product_category': 'M',
            'exemption_reason': 'Amigo',
            'taxes[0][tax_id]': '1935349',
            'taxes[0][value]': '23',
            'taxes[0][order]': '0',
            'taxes[0][cumulative]': '1'
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        body = JSON.parse(response.body);
        //console.log('POST PRODUCT STATUS: ');
        //console.log(body);
        return callback(body);
    });
};

//GET PRODUTOS

function getProducts(callback) {
    var products = [];
    var product;

    var options = {
        'method': 'POST',
        'url': 'https://api.moloni.pt/v1/products/getAll/?access_token=' + token,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=3lodrct23v79gdklqi4qd2ic72'
        },
        form: {
            'company_id': '128873'
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        body = JSON.parse(response.body);

        for (i in body) {
            product = {
                name: body[i].name,
                product_id: body[i].product_id,
                price: body[i].price
            } 
            products.push(product);
        };    

        return callback(products);
    });
}

module.exports.postFatura = postFatura;
module.exports.postFatura2 = postFatura2;
module.exports.refreshToken = refreshToken;