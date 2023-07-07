var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'dbsofinsa_s8rz',
    'dbsofinsa_user',
    'VkGAYoe3EZpgkFtJ1ftRkkHb2KMYZiLX',
    {
        host: 'dpg-chqtc3m4dad3eom8b02g-a',
        port: '5432',
        dialect: 'postgres'
    }
);

module.exports = sequelize;