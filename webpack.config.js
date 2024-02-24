const path = require('path');
const argv = require('yargs').argv;
const isProduction = argv.mode === 'production';



var webAppConfig = {
    entry: './src/index.js',
    output: {
		crossOriginLoading: 'anonymous',
			filename: 'bundle.js',
			path: path.join(__dirname, 'build/public')
    },
	devServer: {
		static: {
		  directory: path.join(__dirname, 'build/public'),
		},
		compress: true,
		port: 8080,
		allowedHosts : ["localhost" , "test.broclan.io"]
	  },
    module: {
			rules: [
				{
					test: /\.svg$/,
					use: ['@svgr/webpack', 'svg-url-loader'],
				  },
				{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			}, {
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			  },
		]
    },
	mode : isProduction ? 'production' : 'development',
	devtool : 'source-map',
	optimization: {
		usedExports: true,
	  },
	experiments: {
		asyncWebAssembly: true,
		topLevelAwait: true,
		layers: true // optional, with some bundlers/frameworks it doesn't work without
		}
};



module.exports = [webAppConfig]

