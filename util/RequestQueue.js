const RequestQueue = function(fn){
    this.reqArr = [];
    this.isRunning = false;
    this.controller = fn;
    this.addQueue = async function(ctx){
        this.reqArr.push(ctx);
    
        this.runHandle();
    }
    this.handle = async function(){
        var ctx = this.reqArr.shift();
        console.log("ctx:",ctx);
        if(!ctx){
            
            this.isRunning = false;
            return;
        }
      

        this.controller(ctx)
    }
    this.runHandle = async function(){
        console.log("runHandle...." + this.isRunning);
        if(this.isRunning){
            return;
        }
        this.isRunning = true;
        this.handle();
    }
}



module.exports = RequestQueue;