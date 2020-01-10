const Router = require('koa-router')
const userRoute = new Router();
const userModel = require("../model/user");
const sequelize = require("../model/sequelize")
const Sequelize = require('sequelize');
// /home
userRoute.get('/create', async (ctx, next) => {
    var query = ctx.query;
    var u = await userModel.create(query);

    ctx.body = u ;
  
})


userRoute.get('/list', async (ctx, next) => {
   
    var list = await userModel.findAll();

    ctx.body = list
  
})


var RequestQueue = require("../util/RequestQueue")
var queue = new RequestQueue(async function(ctx){
     var body = ctx.request.body;
    var id = body.id;
    console.log(id);
    var user = await userModel.findOne({where:{id:id}});
    console.log("---------------");
   var age = user.age + 1;
    var age = 10

   await userModel.update({age:age},{where:{id:id}});
    
   

    //ctx.res.end("{code:1}")
    ctx.body = {code:1,messge:"ok",age:age};
    this.handle();

    
});
userRoute.post("/update",async ctx => {
  //  queue.addQueue(ctx);


    var body = ctx.request.body;
    var id = body.id;
    // Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED // "READ UNCOMMITTED"
    // Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED // "READ COMMITTED"
    // Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ  // "REPEATABLE READ"
    // Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE // "SERIALIZABLE"
    var transaction = await sequelize.transaction({
        autocommit:true,
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });
    var user = await userModel.findOne({where:{id:id},transaction});
  
    var age = user.age - 1;
    
    if(age < 0){
        await transaction.commit();

        ctx.body = {code:1,messge:"没有了",age:age};
    }else{
        await userModel.update({age:age},{where:{id:id},transaction});
        await transaction.commit();
        ctx.body = {code:1,messge:"ok",age:age};
    }
 
    
  
   
   

 
   

  
})

function test(ctx){
    ctx.body = {code:1,messge:"ok"};
}
userRoute.post("/test",async ctx => {
    //ctx.body = {code:1,messge:"ok"};
    test(ctx);
})

module.exports = userRoute