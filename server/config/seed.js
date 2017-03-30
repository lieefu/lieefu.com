/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var User = require('../api/user/user.model');
//role user互联网自注册 oper会员单位操作员 manager协会工作人员 admin管理员
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'user',
    name: '互联网用户',
    email: 'test@test.com',
    active:true,
    password: 'test'
  },{
    provider: 'local',
    role: 'oper',
    name: '会员单位',
    email: 'oper@test.com',
    active:true,
    password: 'test'
  },{
    provider: 'local',
    role: 'manager',
    name: '协会人员',
    email: 'manager@test.com',
    active:true,
    password: 'test'
  },{
    provider: 'local',
    role: 'admin',
    name: '系统管理',
    email: 'admin@test.com',
    active:true,
    password: 'test'
  },{
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    active:true,
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
