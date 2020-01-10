const Sequelize = require('sequelize');
const sequelize = require("./sequelize");
const user = sequelize.define("user",{
    id:{type: Sequelize.INTEGER ,primaryKey: true,autoIncrement: true },
    name:{type: Sequelize.STRING},
  
    age:{type: Sequelize.INTEGER,defaultValue:0}

   
});

module.exports = user;

user.sync();
