module.exports = {
	entry : {
    'me' : './src/MeJS.js',
    '/modules/dialog/dialog' : './src/modules/dialog/dialog.js',
    '/modules/select/select' : './src/modules/select/select.js',
    '/modules/pages/pages' : './src/modules/pages/pages.js',
    '/modules/mustache/mustache' : './src/modules/mustache/mustache.js',
    '/modules/replaceTpl/replaceTpl' : './src/modules/replaceTpl/replaceTpl.js',
    '/modules/errTips/errTips' : './src/modules/errTips/errTips.js',
    '/modules/endTime/endTime' : './src/modules/endTime/endTime.js'
  },
	output : {
		path : './dist',
		filename : '[name].js'
	},
	resolve: {
    extensions: ['', '.js']
  },
	module : {
		loaders: [{
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
    }]
	}
};