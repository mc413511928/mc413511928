const http = require('http');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydoc', { useNewUrlParser: true, useUnifiedTopology: true }).then(doc => console.log('连接数据库成功了')).catch(err => console.log(err));
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    age: {
        type: Number,
        min: 18,
        max: 80
    },
    password: String,
    email: String,
    hobbies: [String]
});

// 创建集合 返回集合构造函数
const User = mongoose.model('User', userSchema);
const app = http.createServer();
const url = require('url');
const querystring = require('querystring');


app.on('request', async(req, res) => {
    let method = req.method;
    const { pathname, query } = url.parse(req.url, true);
    if (method === 'GET') {
        if (pathname == '/list' || pathname == '/') {
            let users = await User.find();
            let str = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>用户列表</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
                </head>
                <body>
                    <div class="container">
                        <h6>
                            <a href="/add" class="btn btn-primary">添加用户</a>
                        </h6>
                        <table class="table table-striped table-bordered">
                            <tr>
                                <td>用户名</td>
                                <td>年龄</td>
                                <td>爱好</td>
                                <td>邮箱</td>
                                <td>操作</td>
                            </tr>
                            `;

            users.forEach(item => {
                str += `
                                <tr>
						<td>${item.name}</td>
						<td>${item.age}</td>
						<td>
                `;
                item.hobbies.forEach(iterm1 => {
                    str += `<span>${iterm1}</span>`;
                })
                str += `</td>
                            <td>${item.email}</td>
                            <td>
                                <a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
                                <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
                            </td>
                        </tr>`;
            });

            str += `
                            </table>
                        </div>
                    </body>
                    </html>
                `;

            res.end(str);
        } else if (pathname == '/add') {
            let add = `
                <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>用户列表</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<h3>添加用户</h3>
		<form method="POST" action="/add">
		  <div class="form-group">
		    <label>用户名</label>
		    <input type="text" class="form-control" placeholder="请填写用户名" name="name">
		  </div>
		  <div class="form-group">
		    <label>密码</label>
		    <input type="password" class="form-control" placeholder="请输入密码" name="password">
		  </div>
		  <div class="form-group">
		    <label>年龄</label>
		    <input type="text" class="form-control" placeholder="请填写邮箱" name="age">
		  </div>
		  <div class="form-group">
		    <label>邮箱</label>
		    <input type="email" class="form-control" placeholder="请填写邮箱" name="email">
		  </div>
		  <div class="form-group">
		    <label>请选择爱好</label>
		    <div>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="足球" name="hobbies"> 足球
		    	</label>
		    	<label class="checkbox-inline"> 
		    	  <input type="checkbox" value="篮球" name="hobbies"> 篮球
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="烫头" name="hobbies"> 烫头
		    	</label>
		    </div>
		  </div>
		  <button type="submit" class="btn btn-primary">添加用户</button>
		</form>
	</div>
</body>
</html>
                `
            res.end(add)
        } else if (pathname == '/modify') {
            let user = await User.findOne({ _id: query.id });
            let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头', '吃饭', '睡觉', '打豆豆']
            console.log(user)
                // 呈现修改用户表单页面
            let modify = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <title>用户列表</title>
                  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
                </head>
                <body>
                  <div class="container">
                    <h3>修改用户</h3>
                    <form method="post" action="/modify?id=${user._id}">
                      <div class="form-group">
                        <label>用户名</label>
                        <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input value="${user.password}" name="password" type="password" class="form-control" placeholder="请输入密码">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input value="${user.age}" name="age" type="text" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input value="${user.email}" name="email" type="email" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
                          
                        
              `;

            hobbies.forEach(item => {
                // 判断当前循环项在不在用户的爱好数据组
                let isHobby = user.hobbies.includes(item);
                if (isHobby) {
                    modify += `
                    <label class="checkbox-inline">
                      <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                    </label>
                  `
                } else {
                    modify += `
                    <label class="checkbox-inline">
                      <input type="checkbox" value="${item}" name="hobbies"> ${item}
                    </label>
                  `
                }
            })

            modify += `
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">修改用户</button>
                    </form>
                  </div>
                </body>
                </html>
              `;
            res.end(modify)
        } else if (pathname == '/remove') {

            // res.end(query.id)


            let num = await User.findOneAndDelete({ _id: query.id });
            console.log(num._id);



            res.writeHead(301, {
                Location: '/list'
            });
            res.end();
        }
    } else if (method == "POST") {
        if (pathname == "/add") {
            let formDate = '';
            // 就收数据返回兵解析
            req.on("data", param => {
                formDate += param
            });
            req.on('end', async() => {
                let Att = querystring.parse(formDate);
                await User.create(Att);

                res.writeHead(301, {
                    Location: '/list'

                })
                res.end();
            })
        } else if (pathname == '/modify') {
            let formDate = '';
            // 就收数据返回兵解析
            req.on("data", param => {
                formDate += param
            });
            req.on('end', async() => {
                let Att = querystring.parse(formDate);
                await User.updateOne({ _id: query.id }, Att)

                res.writeHead(301, {
                    Location: '/list'

                })
                res.end();
            })
        }
    }
})
app.listen(3000);