const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydoc', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('数据库连接唱歌');

}).catch((err) => {
    console.log(err, '数据库连接失败了');

});
const courseSchema = new mongoose.Schema({
    name: String,
    age: Number
});
const Obj = mongoose.model('Obj', courseSchema);
// Obj.create({
//     name: '李时珍',
//     age: 1
// }).then(doc => console.log(doc))
// Obj.find().skip(2).limit(2).then(doc => console.log(doc));
// Obj.updateOne({ age: 18 }, { name: '周杰伦' }).then(doc => console.log(doc));
// Obj.find().then(doc => console.log(doc))
// Obj.find({ name: '周杰伦' }).then(doc => console.log(doc))
// Obj.find({ age: { $gt: 5, $lt: 20 } }).then(doc => console.log(doc));
// Obj.find().select('name age -_id').then(doc => console.log(doc));
// Obj.deleteMany({ age: { $gt: 15, $lt: 20 } }).then(doc => console.log(doc));
Obj.updateOne({ name: '周杰伦' }, { age: 50 }).then(doc => console.log(doc));