module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true
    },
    "settings": {
          "ecmascript": 6,
          "jsx": true
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "experimentalDecorators": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
    ],
    "extends": "airbnb",
    "rules": {
      "linebreak-style": 0,
      "react/jsx-filename-extension": 0,
      "function-paren-newline": 0,
      "no-console": 0,
      "react/destructuring-assignment":  0,
      "react/jsx-one-expression-per-line": 0,
      "max-len": [
        2,
        120, {
            "ignoreComments": true,
            "ignoreTrailingComments": true,
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true
        }
    ]
    }
};  
