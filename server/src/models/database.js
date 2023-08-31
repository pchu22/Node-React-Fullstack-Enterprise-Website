var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'softinsa_db',
    'softinsa_db_user',
    'no9TvSqQFhh82xaYYBKjpIThLxC1YVVg',
    {
        host: 'dpg-cjmcgpvjbvhs73ccr120-a',
        port: '5432',
        dialect: 'postgres'
    }
);

module.exports = sequelize;