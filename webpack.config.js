module.exports = {
	entry: [
		'./app/src/index.js'
	],
	output: {
		path: __dirname + './public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './public',
		proxy: {
			'/api/*': 'http://localhost:7777'
		}
	}
}