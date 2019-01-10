const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PATH_SOURCE = path.join(__dirname, '/src');
const PATH_BUILD  = path.join(__dirname, '/dist');

module.exports = {

	mode: 'development',
	entry: {
		index : PATH_SOURCE + '/index/index.tsx',
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
							'@babel/preset-env',
							'@babel/preset-react'
						],
						plugins: [
							'transform-class-properties'
						]
					}
				}]
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			}
		]
	},

	output: {
		path: PATH_BUILD,
		filename: '[name]/[name].js',
	},

	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
	},

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
