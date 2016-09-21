'use strict';

let webpack = require('webpack');
let webpack_conf = require('../../../webpack.config.js');
let MemoryFS = require('memory-fs');
let mime = require('mime');

let compiler = {}, fs = {};

let callbacks = [];
let isReady = false;

if(think.config('webpack_on')){
    compiler = webpack(webpack_conf);
    fs = new MemoryFS();
    compiler.outputFileSystem = fs;
    compiler.watch({
        aggregateTimeout: 100,
        poll : true
    }, (err, stats) => {
        if(err) throw err;
    });

    compiler.run((err, stats) => {
        if(err) throw err;
        isReady = true;
        let cbs = callbacks;
        callbacks = [];
        cbs.forEach((cb) => {
            cb();
        });

    });
}




/**
 * middleware
 */
module.exports = think.middleware(think.middleware.base,{
    req: function(){
        function getFilenameFromUrl(url){
            var localPrefix = webpack_conf.output.publicPath || "/";
            var filename = url.substr(localPrefix.length + 1);
            if(filename.indexOf("?") >= 0) {
                filename = filename.substr(0, filename.indexOf("?"));
            }
            return filename;
        }
        let res = this.http;
        let fileName = getFilenameFromUrl(res.url);
        let url = webpack_conf.output.path + '/' + fileName;

        if(fs.existsSync(url)){
            let content = fs.readFileSync(url);
            res.header("Content-Length", content.length);
            res.header("Access-Control-Allow-Origin", "*");
            res.type(mime.lookup(fileName));
            res.status(200);
            res.end(content);
        }
        else{
            res.status(404);
            res.end();
        }
    },
    /**
     * run
     * @return {} []
     */
    run: function() {
        let pathName = this.http.pathname;
        if(pathName.indexOf(webpack_conf.output.publicPath) == -1){
            return;
        }
        else{
            if(isReady){
                this.req();
            }
            else{
                callbacks.push(this.req.bind(this));
            }
            return think.prevent();
        }
    }
})
