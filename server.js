var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
//使用ejs模板引擎
app.set('view engine', 'ejs');
var multer = require('multer');
//var upload = multer({dest : 'uploads/'});

var createFolder = function(folder){
     try{
           fs.accessSync(folder);
     }catch(e){
           fs.mkdirSync(folder);
     }
};
var uploadFolder = './upload/';
createFolder(uploadFolder);
var storage = multer.diskStorage({
        destination: function(request, file, cb){
             cb(null, uploadFolder)
        },
        filename: function(request, file, cb){
             cb(null, file.originalname)
        }
});

var upload= multer({storage: storage});
//发送一个urlencoded格式的数据
var urlencodeParser = bodyParser.urlencoded({extended: false});

//发送一个josn格式的数据
var jsonParser = bodyParser.json();

//代表一个请求方法，是一个路由，request请求，response响应
app.get('/', function(request, response){
     //query取出地址栏?后面的值,如：localhost:3000?find=hot. request.query.find=hot
     console.dir(request.query);
     //通过send方法响应一个信息给浏览器
     response.send("homepage =" + request.query.find);
});

//在form路径下上传文件
app.get('/form/:name', function(request, response){
     /*var form = fs.readFileSync('./form.html', {encoding:"utf8"});
     response.send(form);*/
     //response.sendFile(__dirname + '/form.html');
    
     var person = request.params.name;
     response.render('form', {person: person});
});

app.get('/about', function(request, response){
     response.render('about');
});

app.post('/', urlencodeParser, function(request, response){
     console.dir(request.body);
     response.send(request.body.name);
});
//接收上传的文件，保存到路径/upload下
app.post('/upload', upload.single('logo'), function(request, response){
     //打印出对象信息
     console.dir(request.file);
     //上传成功后返回一个json
     response.send({'ret_code' : 0});
});

//:id和:name这两个表示访问路径可以任意变化，如：localhost:3000/profile/23/user/hahaha
app.get('/profile/:id/user/:name', function(request, response){
     console.dir(request.params);
     response.send("this is the homepage id="+request.params.id+ " name="+ request.params.name);
});

//正则表达式?表示匹配任意一个字符，也就是b这个字符可以出现零次或一次,如:/abcd、/acd.而/asscd则不可以
app.get('/ab?cd', function(request, response){
     response.send('/ab?cd');
});


app.listen(3000);
console.log("server start port is 3000");