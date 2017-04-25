/**
 * Created by echo on 2017/4/25.
 */

const Sell = require('../models/Sell');

const User = require('../models/User');
const Upload = require('../models/Upload');

module.exports = {
    'GET /sell/:id': async (ctx, next) => {
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

                avatar = 0,
                avatarpath = '',
                nickname = '',
                addtime = '',

                price = '',
                madetime = '',
                worktime = '';


        await Sell.findById(id).then(function(project) {
            username = project.getDataValue('username');
            brand = project.getDataValue('brand');
            phone = project.getDataValue('phone');
            cartype = project.getDataValue('cartype');
            version = project.getDataValue('version');
            address = project.getDataValue('address');
            contacts = project.getDataValue('contacts');
            description = project.getDataValue('description');
            addtime = new Date(project.getDataValue('addtime') * 1000).toLocaleDateString();

            price = project.getDataValue('price');
            madetime = project.getDataValue('madetime');
            worktime = project.getDataValue('worktime');
        });
        await User.findOne({ where: {username: username} }).then(function(project) {
            nickname = project.getDataValue('nickname');
            avatar =  project.getDataValue('avatar');
        });
        if (avatar === 0) {
            // 默认头像
            avatarpath = "http://eswjdg.com/head-p.png";
        } else {
            await Upload.findById(id).then(function(project) {
                avatarpath = "http://eswjdg.com/" + project.getDataValue('path');
            });
        }

        ctx.render('sell.html', {
            brand: brand,
            phone: phone,
            cartype: cartype,
            version: version,
            address: address,
            contacts: contacts,
            description: description,
            addtime: addtime,

            nickname: nickname,
            avatarpath: avatarpath,
            price: price,
            madetime: madetime,
            worktime: worktime
        });
    }
};