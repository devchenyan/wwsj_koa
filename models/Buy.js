/**
 * Created by echo on 2017/4/22.
 */

const db = require('../db');

module.exports = db.defineModel('jj_cms_buyer', {
    username: db.STRING(100),
    brand: db.STRING(100),
    phone: db.STRING(100),
    cartype: db.STRING(100),
    version: db.STRING(100),
    address: db.STRING(100),
    contacts: db.STRING(100),
    description: db.STRING(100),
    addtime: db.STRING(100)
});