module.exports = {
    env: {
        test: {
            plugins: [ "@babel/plugin-transform-modules-commonjs" ]
        }
    },
    plugins: [
        [ "@babel/plugin-proposal-decorators", { "legacy": true } ],
        "@babel/plugin-proposal-class-properties"
    ],
    presets: [
        [
            "@babel/preset-env",
            {
                corejs: {
                    proposals: true,
                    version: "3.6"
                },
                useBuiltIns: "entry"
            }
        ],
        "@babel/preset-typescript",
        "@babel/preset-react"
    ]
};
