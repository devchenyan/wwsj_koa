/**
 * Created by echo on 2017/4/22.
 */

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome',
            username: username
        });
    }
};