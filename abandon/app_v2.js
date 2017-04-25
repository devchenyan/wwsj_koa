/**
 * Created by echo on 2017/4/14.
 */

//在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
// 注意导入koa-router的语句最后的()是函数调用：
const router = require('koa-router')();

// post请求通常会发送一个表单，或者JSON，它作为request的body发送
// 但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！
// 需要引入另一个middleware来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中
// koa-bodyparser就是用来干这个活的
const bodyParser = require('koa-bodyparser');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 使用router.get('/path', async fn)来注册一个GET请求
// 可以在请求路径中使用带变量的/hello/:name
// 变量可以通过ctx.params.name访问

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post"
            <p>Name:<input name="name" value="koa"></p>
            <p>Password:<input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
            name = ctx.request.body.name || '',
            password = ctx.request.body.password || '';
    console.log(`signin with name:${name}, password:${password}`);
    if (name === 'Koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
                             <p><a href="/">Try again</a></p>`;
    }
});

// 由于middleware的顺序很重要
// koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());

// add router middleware:
app.use(router.routes());

app.listen(3000);

console.log("app started at port 3000");