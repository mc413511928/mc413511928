## 数据库的操作

### 连接数据库

```javascript
npm init -y // 初始化一个项目描述文件
npm i mongoose // 用来操作数据库的第三方包
```

```javascript
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true, // 使用新的 url 规则进行解析
    useUnifiedTopology: true // 使用新的解析引擎
}).then(() => console.log('========数据库连接成功========')).catch(err => console.log(err, '数据库连接失败'));
```

### 创建集合规则

```javascript
// 创建结合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});
```

### 根据集合规则创建集合

**集合非常重要，所有对数据库的操作都要通过集合进行**

```javascript
// 参数1：集合的名字，对应到数据库中的时候会变成复数
// 参数2：集合的规则
const Course = mongoose.model('Course', courseSchema);
```

### 增

```javascript
// 对数据库进行操作
Course.create({
    name: 'JS 高级',
    author: '嘻嘻',
    isPublished: false
}).then(doc => console.log(doc));
```

### 删

```javascript
// 删除符合条件的第一条文档
Course.findOneAndDelete({
    author: '嘻嘻'
}).then(doc => console.log(doc));
```

```javascript
// 删除符合条件的文档
Course.deleteMany({
    isPublished: false
}).then(res => console.log(res)); // { n: 2, ok: 1, deletedCount: 2 }
```

### 改

```javascript
// 修改符合条件的第一条文档
Course.updateOne({
    name: 'Node'
}, {
    author: '李广'
}).then(res => console.log(res)); // { n: 1, nModified: 1, ok: 1 }
```

```javascript
// 修改符合条件的文档
Course.updateMany({}, {
    author: '小兵'
}).then(res => console.log(res)); // { n: 2, nModified: 2, ok: 1 }
```

### 查

```javascript
// 查询符合条件的第一条
Course.findOne({
    author: '我'
}).then(res => console.log(res));
```

```javascript
// find 返回的是一个数组，不论有几条数据
Course.find({
    author: '张嘎'
}).then(res => console.log(res));
```

```javascript
// 应用场景：分页
// skip: 跳过几条
// limit: 需要几条
Course.find().skip(1).limit(2).then(res => console.log(res));
```
