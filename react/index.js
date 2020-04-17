const template = require('art-template');
const path = require('path');
let views = path.join(__dirname, 'views', '01.art')
let html = template(views, {
    // user: [{
    //         age: 18,
    //         name: '张三',
    //         sex: '男'
    //     },
    //     {
    //         age: 19,
    //         name: '张四',
    //         sex: '男'
    //     }
    // ]
    name: '张三',
    age: 18,
    content: '<h1>我是标签体</h1>'
});
console.log(html);