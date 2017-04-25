/**
 * Created by echo on 2017/4/23.
 */

const db = require('../db');

module.exports = db.defineModel('jj_admin_upload', {
    path: db.STRING(100)
});