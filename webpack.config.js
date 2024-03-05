// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// const isProduction = process.env.NODE_ENV !== 'production';

const stylesHandler = 'style-loader';



const config = {
    entry: './src/scripts/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
        hot: true,
        compress: true,
        port: 9000,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'src/index.html' },
                { from: 'src/css/style.css', to: 'css/' },
                { from: '*/resources/*', to: 'resources/[name][ext]' },
                { from: '*/resources/Font/*', to: 'resources/Font/[name][ext]' },
                { from: '*/resources/Sounds/*', to: 'resources/Sounds/[name][ext]' }
            ],
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.(svg|png|jpg|gif)$/i,
                type: 'asset/resource',
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                    },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '*/[name][ext]'
                        }
                    },
                ],
            },
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: "ts-loader",
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    config.mode = 'development'
    // if (isProduction) {
    //     config.mode = 'production';


    // } else {
    //     config.mode = 'development';
    // }
    return config;
};
