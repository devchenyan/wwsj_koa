/**
 * Created by echo on 2017/4/14.
 */

//在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// next是koa传入的将要处理的下一个异步函数

// 由async标记的函数称为异步函数，
// 在异步函数中，可以用await调用另一个异步函数，这两个关键字将在ES7中引入

// 如果一个middleware没有调用await next()，会怎么办？
// 答案是后续的middleware将不再执行了。

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next(); //调用下一个middleware  =1
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); //当前时间  =2
    await next(); //调用下一个middleware  =3
    const ms = new Date().getTime() - start; //耗费时间  =7
    console.log(`Time: ${ms}ms`); //  =8
});

app.use(async (ctx, next) => {
    await next(); //  = 4
    ctx.response.type = 'text/html'; //  =5
    ctx.response.body = '<h1>Hello, koa2!</h1>'; //  =6
});

app.listen(3000);

console.log("app started at port 3000");



