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
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
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

	plugins: [
		new OptimizeCSSAssetsPlugin(),
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
