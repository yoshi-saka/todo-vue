module.exports = {
    module: {
        rules: [
            {
                test: /\.(scss$|css$)/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
        ]
    },
}
