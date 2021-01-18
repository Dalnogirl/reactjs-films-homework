module.exports = {
    'env': {
        'browser': true,
        'es2020': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb', 'airbnb/hooks'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'semi': [2, 'never'],
        'linebreak-style': 0,
        'object-curly-spacing': 0,
        'react/jsx-tag-spacing': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-indent': 0,
        'import/extensions': 0
    }
}
