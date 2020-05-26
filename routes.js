function verifyRoute(id1, id2, callback) {
    var bar;
    switch (id1) {
        case 'gualtar':
            switch (id2) {
                case ('bar1'):
                    return callback();
                case ('bar2'):
                    return callback();
                case ('bar3'):
                    return callback();
                case ('bar4'):
                    return callback();
                case ('bar5'):
                    return callback();
                case ('bar6'):
                    return callback();
                case ('bar7'):
                    return callback();
                default:
                    return 'Not a valid bar...';
            }
            break;
        case 'azurem':
            switch (id2) {
                case ('baree'):
                    return callback();
                case ('barea'):
                    return callback();
                case ('barn'):
                    return callback();
                default:
                    return 'Not a valid bar...';
            }
            break;
        default:
            return 'Not a valid campus...';
    }
}

module.exports.verifyRoute = verifyRoute;