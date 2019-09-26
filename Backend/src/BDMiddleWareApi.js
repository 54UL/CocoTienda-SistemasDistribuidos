//MIDDLE WARE CORE API

 class BDMiddleWareAPI {
    constructor() {
        this.apiName = "";
        this.bdenpoint = "";
        this.user = "";
        this.pass = "";
        this.bdqueryDelagate = function(query){}
        this.bdConfigDelegate = function(){}
        this.bdConnectDeleagte = function(){}
    }
}


var MAX_APIS =2;
class BDManagerApi
{ 
    constructor()
    {
        this.apiInstances =  BDMiddleWareAPI[MAX_APIS];
        this.apiCount = 0;
        this.addApi = function (api,name)
        {
            var currentIndex = globalApiManager.apiInstances++;
            if(currentIndex<MAX_APIS)
            globalApiManager.apiInstances[currentIndex] = api;
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

