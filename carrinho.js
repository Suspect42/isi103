var artigos = [];

function setArtigos(produtos, callback){
    artigos = produtos;

    return callback();
}

function resetCarrinho(callback){
    artigos = [];

    return callback();
};

module.exports.setArtigos = setArtigos;
module.exports.resetCarrinho = resetCarrinho;
module.exports.artigos = artigos;