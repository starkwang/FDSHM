module.exports = {
    entry: './src/bundle-config.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.coffee$/,
            loader: 'coffee-loader'
        }, {
            test: /\.css$/,
            loader: "css-loader"
        }]
    }
};
