var gulp = require('gulp');
var gutil = require('gulp-util');
var webpackStream = require('webpack-stream');
var webpack = webpackStream.webpack;
var webpackConf = require('../conf/webpack');
var WebpackDevServer = require('webpack-dev-server');
var _ = require('lodash');
var src = require('../conf/src');

gulp.task('webpack:build', build(webpackConf));
function build(conf){
    return function(){
        conf = _.clone(conf);
        conf.plugins = conf.plugins.concat(
          new webpack.DefinePlugin({
              "process.env": {
                  // This has effect on the react lib size
                  "NODE_ENV": JSON.stringify("production")
              }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        );

        return gulp.src(src.jsMain)
          .pipe(webpackStream(conf))
          .pipe(gulp.dest(src.dist));
    };

}

gulp.task('webpack:dev', dev(webpackConf));
function dev(conf){
    return function(){
        conf = _.clone(conf);
        conf.devtool = 'eval';
        conf.debug = true;
        var port = conf.port || 3000;
        var host = 'localhost';

        // Start a webpack-dev-server
        new WebpackDevServer(webpack(conf), {
            publicPath: '/' + conf.output.publicPath,
            stats: {
                colors: true
            },
            proxy: conf.devServer && conf.devServer.proxy || {}
        }).listen(port, host, function(err) {
            if(err) throw new gutil.PluginError('webpack-dev-server', err);
            gutil.log('[webpack-dev-server]', `http://${host}:${port}/webpack-dev-server/index.html`);
        });
    }
}

module.exports = {
    build: build,
    dev: dev
}