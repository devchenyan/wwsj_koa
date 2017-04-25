/**
 * Created by echo on 2017/4/22.
 */

const db = require('../db');

module.exports = db.defineModel('jj_cms_recruit', {
    username: db.STRING(100),

    companyname: db.STRING(100),
    workback: db.STRING(100),
    educational: db.STRING(100),

    jobtitle: db.STRING(100),
    salary: db.STRING(100),

    phone: db.STRING(100),
    workplace: db.STRING(100),

    description: db.STRING(100),
    addtime: db.STRING(100)
});
