module.exports = {
    entry: {
        'index/index': './src/pages/index/index.js'
    },
    output: {
        filename: '[name].bundle.js'
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
