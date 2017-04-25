/**
 * Created by echo on 2017/4/14.
 */
'use strict';

var http = require('http');

var server = http.createServer(function (req, res) {
    //回调函数接收request、response对象，
    //获得HTTP请求的method和url
    console.log(req.method + ":" + req.url);

    //将HTTP响应200写入response，同时设置Content-Type:text/html
    res.writeHead(200, {'Content-Type':'text/html'});
    //将HTTP响应的HTML内容写入response
    res.end('<h1>hello</h1>');
});

server.listen(8080);

console.log('Server is running at 8080');