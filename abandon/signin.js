/**
 * Created by echo on 2017/4/22.
 */

module.exports = {
    'POST /signin': async (ctx, next) => {
        var
                email = ctx.request.body.email || '',
                password = ctx.request.body.password || '';

        if (email === 'admin@163.com' && password === '12345') {
            console.log('signin ok!');
            ctx.render('signin-ok.html', {
                title: 'Sign In Ok',
                name: 'Admin'
            });
        } else {
            console.log('signin failed!');
            ctx.render('signin-failed.html', {
                title: 'Sign in Failed'
            });
        }
    }
};