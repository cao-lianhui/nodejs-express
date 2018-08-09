//中间件示例
var express = require('express');

var app = express();

//导入路由中间件
var indexRouter = require('./router/index');
var usersRouter = require('./router/user');

//使用导入的中间件
app.use('/', indexRouter);
app.use('/users', usersRouter);

/*//中间件响应静态文件 访问格式问localhost:3000/public下的静态文件
app.use(express.static('public'));
//use使用中间件
app.use(function(request, response, next){
      console.log('first middleware');
      //处理完之后传递给下一个中间件，没有next就会在此中间件中断
      next();
      console.log('after first middleware');
});

app.use(function(request, response, next){
      console.log('second middleware');
      response.send('ok');
});

//app里的function实际上也是一个中间件
app.get('/users', function(request, response, next){
      response.send('users');
});

app.get('/', function(request, response, next){
      response.send('root');
});*/


app.listen(3000);
console.log('listen to port 3000');