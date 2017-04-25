/**
 * Created by echo on 2017/4/23.
 */

const db = require('../db');

module.exports = db.defineModel('jj_admin_user', {
    nickname: db.STRING(100),
    username: db.STRING(100),
    avatar: db.STRING(100)
});