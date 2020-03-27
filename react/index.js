const template = require('art-template');
const path = require('path');
let views = path.join(__dirname, 'views', 'index.art')
let html = template(views, {
    name: '张三',
    age: 15
});
console.log(html);