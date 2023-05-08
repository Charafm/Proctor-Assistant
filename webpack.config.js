const path = require('path');
module.exports = {
	entry: './src/index.js',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: { fallback: { crypto: false } },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{ test: /\.(png|jpe?g|gif)$/i, use: [{ loader: 'file-loader' }] },
		],
	},
	devServer: { historyApiFallback: true },
};
