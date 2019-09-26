//MIDDLE WARE CORE API

 class BDMiddleWareAPI {
    constructor() {
        this.apiName = "";
        this.bdenpoint = "";
        this.user = "";
        this.pass = "";
        this.query = function(query){}
        this.config = function(){}
        this.connect = function(){}
    }
}


var MAX_APIS =2;
class BDManagerApi
{ 
    constructor()
    {
        this.apiInstances= [];
        this.apiCount = 0;
        this.init = function()
        {
            //this.apiInstances = new BDManagerApi[2];
        }
        this.addApi = function (api)
        {
            var currentIndex = this.apiCount++;
            console.log("current index api"+currentIndex);
            if(currentIndex<2)
            this.apiInstances.push(api);
            else
            console.log("cannot add more bd API'S");
        }
        this.getApi = function(name)
        {
            for(var i=0; i<globalApiManager.apiCount;i++)
            {
                //might be string compare ?
                if(globalApiManager.apiInstances[i].name == name)
                {
                    return globalApiManager.apiInstances[i]
                }
            }
        }
    }
}

var  globalApiManager = new BDManagerApi();

module.exports.globalApiManager = globalApiManager;
module.exports.BDMiddleWareAPI  = BDMiddleWareAPI;
module.exports.BDManagerApi     = BDManagerApi;

