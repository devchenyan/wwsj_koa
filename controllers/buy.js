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
            username = project.getDataValue('username');
            brand = project.getDataValue('brand');
            phone = project.getDataValue('phone');
            cartype = project.getDataValue('cartype');
            version = project.getDataValue('version');
            address = project.getDataValue('address');
            contacts = project.getDataValue('contacts');
            description = project.getDataValue('description');
            addtime = new Date(project.getDataValue('addtime') * 1000).toLocaleDateString()
        });
        await User.findOne({ where: {username: username} }).then(function(project) {
            nickname = project.getDataValue('nickname');
            avatar =  project.getDataValue('avatar');
        });
        await Upload.findById(id).then(function(project) {
            avatarpath = "http://eswjdg.com/" + project.getDataValue('path');
        });

        ctx.render('buy.html', {
            title: 'Buy',
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