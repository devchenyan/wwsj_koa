/**
 * Created by echo on 2017/4/22.
 */

const Buy = require('../models/Buy');

const User = require('../models/User');
const Upload = require('../models/Upload');

module.exports = {
    'GET /buy/:id': async (ctx, next) => {
        var
                id = ctx.params.id,
                username = '',

                brand = '',
                version ='',
                cartype = '',

                contacts = '',
                phone = '',
                address = '',

                description = '',
                addtime = '',

                avatar = '',
                avatarpath = '',
                nickname = '';


        await Buy.findById(id).then(function(project) {
            username = project.get('username');

            brand = project.get('brand');
            version = project.get('version');
            cartype = project.get('cartype');

            contacts = project.get('contacts');
            phone = project.get('phone');
            address = project.get('address');

            description = project.get('description');
            addtime = new Date(project.get('addtime') * 1000).toLocaleDateString()
        });
        await User.findOne({ where: {username: username} }).then(function(project) {
            nickname = project.get('nickname');
            avatar =  project.get('avatar');
        });
        if (avatar === 0) {
            // 默认头像
            avatarpath = "http://eswjdg.com/head-p.png";
        } else {
            await Upload.findById(avatar).then(function(project) {
                avatarpath = "http://eswjdg.com/" + project.get('path');
            });
        }

        ctx.render('buy.html', {
            brand: brand,
            cartype: cartype,
            version: version,

            contacts: contacts,
            phone: phone,
            address: address,

            description: description,
            addtime: addtime,

            nickname: nickname,
            avatarpath: avatarpath
        });
    }
};