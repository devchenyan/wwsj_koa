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
                phone = '',
                cartype = '',
                version ='',
                address = '',
                contacts = '',
                description = '',

                avatar = '',
                avatarpath = '',
                nickname = '',
                addtime = '';


        await Buy.findById(id).then(function(project) {
            username = project.get('username');
            brand = project.get('brand');
            phone = project.get('phone');
            cartype = project.get('cartype');
            version = project.get('version');
            address = project.get('address');
            contacts = project.get('contacts');
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
            phone: phone,
            cartype: cartype,
            version: version,
            address: address,
            contacts: contacts,
            description: description,
            addtime: addtime,

            nickname: nickname,
            avatarpath: avatarpath
        });
    }
};