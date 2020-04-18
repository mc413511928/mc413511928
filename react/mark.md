## 创建服务器

```javascript
// Step1: 引入模块
const express = require('express');
// Step2: 创建服务器
const app = express();

// Step3: 监听客户端请求
app.get('/', (req, res) => {
    // 1. 根据内容自动设置内容类型 Content-Type
    // 2. 会设置内容的编码
    // 3. 会设置状态码
    res.send('ok');
});

// Step4: 设置端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

## 中间件应用场景

app.use注意: 既可以匹配 GET 请求也可以匹配 POST 请求；匹配的意思是：请求地址以 use 的第一个参数开头就是匹配！

- 路由拦截

```javascript
app.use('/admin', (req, res, next) => {
    let isLogin = false;
    if (isLogin) {
        // next 是放行，可以继续匹配后面的路由
        next();
    } else {
        res.send('未登录！');
    }
});
app.get('/admin', (req, res) => {
    res.send('欢迎登陆');
});
```

- 网站维护公告

**一定要写在所有路由的最前面！**

```javascript
// app.use 第一个参数可以不写，默认就是 /，会匹配所有的请求
app.use((req, res) => {
    res.send('网站正在维护...');
});
```

- 网站 404

**一定要写在所有路由的最后面！**

```javascript
// app.use 第一个参数可以不写，默认就是 /，会匹配所有的请求
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});
```

- 错误处理中间件

```javascript
// 写在所有路由的最后，注意这里有 4 个参数
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
```

## 模块化路由

```javascript
// app.js => 入口文件
// Step1: 引入模块
const express = require('express');
// Step2: 创建服务器
const app = express();

// 一级路由用 use
app.use('/admin', require('./route/admin'));
app.use('/user', require('./route/user'));

// Step4: 设置端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

```javascript
// route/admin.js
const express = require('express');
// 创建路由对象
const admin = express.Router();

admin.get('/', (req, res) => {
    res.send('admin');
});

module.exports = admin;
```

```javascript
// route/user.js
const express = require('express');
// 创建路由对象
const user = express.Router();

user.get('/', (req, res) => {
    res.send('user');
});

module.exports = user;
```

## 请求数据处理

- 获取 GET 请求

```javascript
// localhost:3000/admin/?id=888&name=ifer&age=18
req.query
```

- 获取 POST 请求

```javascript
npm i body-parser

const bodyParser = require('body-parser');
// extended: false 会使用默认的 querystring 模块进行解析，推荐
// extended: true 会使用第三方的 qs 模块进行解析
app.use(bodyParser.urlencoded({ extended: false }));

// req.body => 可以获取 post 请求啦
```

- body-parser 的原理分析

```javascript
const querystring = require('querystring');
module.exports = {
    urlencoded: (obj) => (req, res, next) => {
        if(obj.extended) {
            // ...
        } else {
            // ...
        }
        let str = '';
        req.on('data', chunk => {
            str += chunk;
        });
        req.on('end', () => {
            req.body = querystring.parse(str);
            // 继续往下匹配
            next();
        });
    }
};
```
- Express 路有参数

```javascript
// localhost:3000/admin/888/ifer/18
app.get('/admin/:id/:name/:age', (req, res) => {
    // req.params => { id: 888, name: 'ifer', age: 18 }
    res.send(req.params);
});
```

## 模板引擎和 Express 结合

```javascript
// 用怎样的模板引擎去渲染 art 结尾的文件
app.engine('art', require('express-art-template'));
// 设置模板引擎的目录
app.set('views', path.join(__dirname, 'views'));
// 设置默认后缀
app.set('view engine', 'art');
```