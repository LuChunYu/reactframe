var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var buildPath = path.resolve(__dirname, 'www', 'dist/');

var conf = {
    cache: true,
    entry: {
    },
    output: {
        path: buildPath,
        publicPath : 'dist/',
        filename: '[name].js',
        pathinfo : true
    },
    resolve: {
        extensions: ['', '.js', '.jsx','.css']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015','react'],
                    cacheDirectory : true
                }
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            { test: /\.(gif|png|jpe?g)$/, loader: "url-loader"}
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin("[name].css",{
            allChunks: true
        })
    ]
};

try{
    var stats = fs.statSync(path.resolve(__dirname,'dev.yml'));
}
catch(e){
    conf.devtool = 'eval'
    conf.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            minimize: true,
            compress: {
                drop_debugger: true,
                warnings: false,
                drop_console: true
            }
		})
	);
    conf.plugins.push(
        new webpack.DefinePlugin({
            "process.env" : {
                NODE_ENV : JSON.stringify("production")
            }
        })
    );
}


module.exports = conf;
