var env = 'DEV';


if (env === 'DEV') {
    var PhpRoot = '127.0.0.1:8000/';
    var PhpApiRoot = '127.0.0.1:8000/api/';
}
else {
    var PhpRoot = 'hrewidencja.pl/';
    var PhpApiRoot = 'hrewidencja.pl/api/';
}

export const ROOT = window.location.protocol + "//" + PhpRoot;
export const API_ROOT = window.location.protocol + "//" + PhpApiRoot;
