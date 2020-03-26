//引入系统模块http
const http = require('http');
//创建服务器
// app就是网站服务器对象
const app = http.createServer();
const url = require('url');
app.on('request', (req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    console.log(query);
    console.log(pathname);
    console.log(url.parse(req.url, true));


    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
    if (pathname == '/index' || pathname == '/') {
        // req.writeHead('200',{

        // })
        res.end('welcome index');
    } else if (pathname == '/list') {
        res.end(`<h1>欢迎来到${query.name}</h1>`)
    } else {
        res.end('notfind')
    }
    exit
    console.log(req.headers['host']);

})

//监听端口
app.listen(3001)
console.log('服务器启动成功');