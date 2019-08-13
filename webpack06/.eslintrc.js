module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-a11y/no-noninteractive-element-interactions": 1,
        "jsx-a11y/click-events-have-key-events": 1,
        "import/no-unresolved": 1
    },
}