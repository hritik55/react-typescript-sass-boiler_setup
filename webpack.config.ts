import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const isDevelopment = process.env.NODE_ENV != "production";

const plugins:webpack.WebpackPluginInstance[] =[
    new HtmlWebpackPlugin({
        template: './public/index.html'
    })
];
isDevelopment && plugins.push(new ReactRefreshWebpackPlugin);

const config: webpack.Configuration = {
    mode: "development",
    devServer: {
        hot: true,
        port: 3000
    },
    entry: {
        main: path.resolve(__dirname, 'src/index.tsx')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins,
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
        alias: {
            '@pages': path.resolve(__dirname, './src/pages')
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [
                                isDevelopment && require('react-refresh/babel')
                            ].filter(Boolean)
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}

export default config;