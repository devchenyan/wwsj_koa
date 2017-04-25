/**
 * Created by echo on 2017/4/22.
 */

const Buy = require('../models/Buy');

module.exports = {
    'GET /': async (ctx, next) => {
        var username = '';
        await Buy.findById('146').then(function(project) {
            username = project.getDataValue('username');
            console.log(`username: ${username}`);
        });
        ctx.render('index.html', {
            title: 'Welcome',
            username: username
        });
    }
};