const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PATH_SOURCE = path.join(__dirname, '/src');
const PATH_BUILD  = path.join(__dirname, '/dist');

module.exports = {

	mode: 'development',
	entry: {
		index : PATH_SOURCE + '/index/index.js',
	},

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react"
						],
						// plugins: [
						// 	"transform-class-properties"
						// ]
					}
				}]
			},
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true },
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true },
					}
				],
			}
		]
	},

	output: {
		path: PATH_BUILD,
		filename: '[name]/[name].js',
		// chunkFilename: '[name]/[name].chunk.js'
	},

	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
	},

	plugins: [
		new OptimizeCSSAssetsPlugin({}),
		new MiniCssExtractPlugin({
			filename: '[name]/[name].css'
		})
	],

	devServer: {
		port: 8000,
		// host: '0.0.0.0',
		inline: true,
		// hot: true,
		historyApiFallback: {
			index: '/templates/index/index.html'
		},
		publicPath: 'src/',
		contentBase: './'
	}
}
