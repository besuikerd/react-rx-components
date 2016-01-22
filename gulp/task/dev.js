var gulp = require('gulp');
var argv = require('yargs').argv;
var webpackDev = require('./webpack').dev;
var webpackConf = require('../conf/webpack');
var _ = require('lodash');

gulp.task('dev', function(callback){
    var conf = _.clone(webpackConf);
    var port = argv.p || argv.port;
    if(port && typeof port == 'number'){
        conf.port = port;
    }

    var proxy = argv.proxy;
    if(proxy && typeof proxy == 'string') {
        conf.devServer = {
            proxy: {
                '*': {
                    target: proxy
                }
            }
        };
    }

    return webpackDev(conf)(callback);
});