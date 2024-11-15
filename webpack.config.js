const path = require('path');

module.exports = {
    entry: {
        referrer: './src/referrer_source.js',
        populate: './src/populate_source.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    // optimization: {
    //     minimize: false,  // Disable minification
    // },    
};
