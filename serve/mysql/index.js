const Sequelize = require('sequelize');
const {database,username,password,host} = require('../config');
const sequelize  = new Sequelize(database,username,password,{
    host:host,
    dialect:'mysql',
});
const User = sequelize.define('user',
{
user: Sequelize.STRING,//用户名
password: Sequelize.STRING//密码
},
{
    freezeTableName: true,
    timestamps: false
});
const History = sequelize.define('history',
{
user: Sequelize.STRING,//用户名
question: Sequelize.STRING,//历史提问
},
{
    freezeTableName: true
});
module.exports = {
    User,History
}