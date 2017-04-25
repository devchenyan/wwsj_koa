/**
 * Created by echo on 2017/4/26.
 */

const Recruit = require('../models/Recruit');

const User = require('../models/User');
const Upload = require('../models/Upload');

module.exports = {
    'GET /recruit/:id': async (ctx, next) => {
        var
                id = ctx.params.id,
                username = '',

                companyname = '',
                workback = '',
                educational = '',

                jobtitle ='',
                salary = '',

                phone = '',
                workplace = '',

                description = '',
                addtime = '',

                avatar = '',
                avatarpath = '',
                nickname = '';



        await Recruit.findById(id).then(function(project) {
            username = project.get('username');

            companyname = project.get('companyname');
            workback = project.get('workback');
            educational = project.get('educational');


            jobtitle = project.get('jobtitle');
            salary = project.get('salary');

            phone = project.get('phone');
            workplace = project.get('workplace');

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

        ctx.render('recruit.html', {
            companyname: companyname,
            workback: workback,
            educational: educational,

            jobtitle: jobtitle,
            salary: salary,

            phone: phone,
            workplace: workplace,

            description: description,
            addtime: addtime,

            nickname: nickname,
            avatarpath: avatarpath
        });
    }
};