module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'es6': true,
    },
    'parserOptions': {
        'ecmaVersion': 2017,
        'sourceType': 'module',
    },
    'extends': [
        'google',
    ],
    'rules': {
        'max-len': [2, {
            'code': 120,
            'comments': 120,
        }],
        'no-console': 'warn',
        'linebreak-style': 0,
    },
    'globals': {
        'ENV': true,
    },
};
