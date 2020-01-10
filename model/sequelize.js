const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'koa',
     'root',
     'luoluqi',
    //"root",
    //"123456",
    {
        //host: '118.31.245.237',
      
        host:'localhost',
        dialect: 'mysql',


        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false, // 默认为 true
            freezeTableName: true
        }
    });

module.exports = sequelize;

sequelize
    .authenticate()
    .then(function(){
    console.log('Connection has been established successfully.');
})
.catch(function(err){
    console.error('Unable to connect to the database:', err);
});