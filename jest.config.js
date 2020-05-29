module.exports = {
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
}