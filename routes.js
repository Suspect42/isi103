function verifyRoute1(id) {
    var campus;
    switch (id) {
        case 'gualtar':
            campus = {
                name: 'Campus de Gualtar',
                bars: ['BAR1', 'BAR2', 'BAR3', 'BAR4', 'BAR5', 'BAR6', 'BAR7']
            }
            return campus;
            break;
        case 'azurem':
            campus = {
                name: 'Campus de Azurem',
                bars: ['Bar da Escola de Engenharia', 'Bar da Escola de Arquitetura', 'Bar da Nave']
            }
            return campus;
            break;
        default:
            return 'Not a valid campus...';
    }
}

function verifyRoute2(id1, id2, callback) {
    var bar;
    switch (id1) {
        case 'gualtar':
            switch (id2) {
                case ('bar1'):
                    bar = {
                        campus: 'Campus de Gualtar',
                        name: 'Bar1',
                        products: []
                    }
                    return bar;
                    break;
                case ('bar2'):
                    bar = {
                        campus: 'Campus de Gualtar',
                        name: 'Bar2',
                        products: []
                    }
                    return bar;
                    break;
                case ('bar3'):
                    bar = {
                        campus: 'Campus de Gualtar',
                        name: 'Bar3',
                        products: []
                    }
                    return bar;
                    break;
                case ('bar4'):
                    bar = {
                        campus: 'Campus de Gualtar',
                        name: 'Bar4',
                        products: []
                    }
                    return bar;
                    break;
                case ('bar5'):
                    bar = {
                        campus: 'Campus de Gualtar',
                        name: 'Bar5',
                        products: []
                    }
                    return bar;
                    break;
                case ('bar6'):
                    bar = {
                        campus: 'Campus de Gualtar',
                        name: 'Bar6',
                        products: []
                    }
                    return bar;
                    break;
                case ('bar7'):
                    bar = {
                        campus: 'Campus de Gualtar',
                        name: 'Bar7',
                        products: []
                    }
                    return bar;
                    break;
                default:
                    return 'Not a valid bar...';
            }
            break;
        case 'azurem':
            switch (id2) {
                case ('baree'):
                    return callback();
                case ('barea'):
                    bar = {
                        campus: 'Campus de Azurem',
                        name: 'Bar da Escola de Arquitetura',
                        products: []
                    }
                    return bar;
                    break;
                case ('barn'):
                    bar = {
                        campus: 'Campus de Azurem',
                        name: 'Bar da Nave',
                        products: []
                    }
                    return bar;
                    break;
                default:
                    return 'Not a valid bar...';
            }
            break;
        default:
            return 'Not a valid campus...';
    }
}

module.exports.verifyRoute1 = verifyRoute1;
module.exports.verifyRoute2 = verifyRoute2;