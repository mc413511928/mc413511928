const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('数据库连接唱歌');

}).catch((err) => {
    console.log(err, '数据库连接失败了');

});
// 创建集合规则
// const CourseSchema = new mongoose.Schema({
//         name: String,
//         anthor: String,

//     })
//     // 创建集合
// const Course = mongoose.model('Course', CourseSchema);
// const course = new Course({
//     name: '张三',
//     anthor: '18'
// });
// course.save();
// 创建集合规则
const CourseSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hobbies: [String],
    email: String,
    password: String
});
// 创建集合
const User = mongoose.model('User', CourseSchema);
// 窗机文档
// Course.create({
//     name: '周杰伦',
//     age: '18'
// }).then(doc => {
//     console.log(doc);

// }).catch(err => console.log(err));
// Course.find().then(result => console.log(result));
// Course.findOne
// User.find().then(doc => console.log(doc));
// User.findOne({
//     email: "zhangsan@itcast.cn"
// }).then(doc => console.log(doc));
// User.findOne().then(doc => console.log(doc));
// User.find({ hobbies: { $in: ['敲代码'] } }).then(doc => console.log(doc));
// User.find().skip(2).limit(3).then(doc => console.log(doc));
// User.find().sort('age').then(doc => console.log(doc));
// User.find({ age: { $gt: 20, $lt: 40 } }).then(doc => console.log(doc));
// User.find({ hobbies: { $in: ['打豆豆'] } }).then(doc => console.log(doc));
// User.find().select('name email').then(doc => console.log(doc));
// User.find().select('name eamil').then(doc => console.log(doc));
// User.find({ age: { $gt: 15, $lt: 30 } }).then(doc => console.log(doc));
// User.find({ hobbies: { $in: ['敲代码'] } }).then(doc => console.log(doc));
// User.findOneAndDelete({ _id: '5c09f267aeb04b22f8460968' }).then(doc => console.log(doc));
// User.updateMany({}, { age: 33 }).then(doc => console.log(doc));
// User.updateOne({ name: '李四' }, { name: '特朗普' }).then(doc => console.log(doc));
User.findOneAndDelete({ name: '特朗普' }).then(doc => console.log(doc));