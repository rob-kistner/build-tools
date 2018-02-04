var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // minimize: true || {/*css nano options*/}
                            }
                        },
                        // {
                        //     loader: 'postcss-loader'
                        // },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader?sourceMap'
                        }
                    ],

                })
            },
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin('styles.css')
    ],
    devtool: '#eval-source-map'
}
