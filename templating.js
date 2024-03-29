/**
 * Created by echo on 2017/4/22.
 */

/* 集成Nunjucks实际上也是编写一个middleware，
   这个middleware的作用是给ctx对象绑定一个render(view, model)的方法，
   这样，后面的Controller就可以调用这个方法来渲染模板了。
 */

const nunjucks = require('nunjucks');

/* 变量env就表示Nunjucks模板引擎对象，
 它有一个render(view, model)方法，
 正好传入view和model两个参数，并返回字符串。
 */
function createEnv(path, opts) {
    var
            autoescape = opts.autoescape === undefined ? true : opts.autoescape,
            noCache = opts.noCache || false,
            watch = opts.watch || false,
            throwOnUndefined = opts.throwOnUndefined || false,
            env = new nunjucks.Environment(
                    new nunjucks.FileSystemLoader(path || 'views', {
                        noCache: noCache,
                        watch: watch
                    }), {
                        autoescape: autoescape,
                        throwOnUndefined: throwOnUndefined
                    }
            );
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // 创建Nunjucks的env对象:
    var env = createEnv(path, opts);
    return async(ctx, next) => {
        // 给ctx绑定render函数:
        ctx.render = function (view, model) {
            // 把render后的内容赋值给response.body:
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type:
            ctx.response.type = 'text/html';
        };
        // 继续处理请求:
        await next();
    };
}

module.exports = templating;

