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
                cartype = '',
                version ='',

                price = '',
                madetime = '',
                worktime = '',

                contacts = '',
                phone = '',
                address = '',

                description = '',
                addtime = '',

                avatar = '',
                avatarpath = '',
                nickname = '',

                images = [],
                imageUrls = [];

        await Sell.findById(id).then(function(project) {
            username = project.get('username');

            brand = project.get('brand');
            cartype = project.get('cartype');
            version = project.get('version');

            price = project.get('price');
            madetime = project.get('madetime');
            worktime = project.get('worktime');

            contacts = project.get('contacts');
            phone = project.get('phone');
            address = project.get('address');

            description = project.get('description');
            addtime = new Date(project.get('addtime') * 1000).toLocaleDateString();

            images = project.get('images').split(",");
        });

        console.log("images:" + images);

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

        if (images.length) {
            console.log("进入images");
            for (var i = 0; i < images.length; i++) {
                await Upload.findById(images[i]).then(function(project) {
                    imageUrls.push("http://eswjdg.com/" + project.get('path'));
                });
            }
        }

        ctx.render('sell.html', {
            brand: brand,
            cartype: cartype,
            version: version,

            price: price,
            madetime: madetime,
            worktime: worktime,

            contacts: contacts,
            phone: phone,
            address: address,

            description: description,
            addtime: addtime,

            nickname: nickname,
            avatarpath: avatarpath,

            imageUrls: imageUrls
        });
    }
};