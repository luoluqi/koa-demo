const fs = require("fs");
const path = require("path");
const Koa = require('koa');

const Router = require('koa-router')

const static_ = require('koa-static')
const bodyParser = require('koa-bodyparser')

const app = new Koa();
const router = new Router()
app.use(static_(
    path.join(__dirname, './static')
))



app.use(bodyParser())
// logger

app.use(async (ctx, next) => {
 
  await next();
 
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
 
  await next();

  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response


// 其他页面通过 router 加载
let routers = fs.readdirSync(__dirname + '/router')
routers.forEach((element) => {
    let module = require(__dirname + '/router/' + element)
    /*
      urls 下面的每个文件负责一个特定的功能，分开管理
      通过 fs.readdirSync 读取 urls 目录下的所有文件名，挂载到 router 上面
    */
    router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})
app.use(router.routes())





app.listen(3000);