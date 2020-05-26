var artigos = [];

function putArtigo(artigo, callback){
    var cont = 0;

    for(i in artigos){
        if(artigos[i] == artigo.itemKey){
            artigos[i].qty += 1;
            cont += 1;
        }
    }

    if(cont == 0){
        artigos.push(artigo);
    }

    return callback();
};

function resetCarrinho(callback){
    artigos = [];

    return callback();
};

module.exports.putArtigo = putArtigo;
module.exports.resetCarrinho = resetCarrinho;
module.exports.artigos = artigos;