//MIDDLE WARE CORE API

class BDMiddleWareAPI {
    constructor() {
        this.apiName = "";
        this.bdenpoint = "";
        this.user = "";
        this.pass = "";
        this.bdqueryDelagate = function(query){}
        this.bdConfigDelegate = function(){}
        this.bdConnectDeleagte = function bdConnect(bdname,endpoint,usr,pass){}
    }
}


var MAX_APIS =2;
class bdManagerApi
{ 
    constructor()
    {
        this.apiInstances =  BDMiddleWareAPI[MAX_APIS];
        this.apiCount = 0;
        this.addApi = function (api,name)
        {
            var currentIndex = globalApiManager.apiInstances++;
            api.name = name;
            if(currentIndex<MAX_APIS)
            globalApiManager.apiInstances[currentIndex] = api;
            else
            console.log("cannot add more bd API'S");
        },
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
var globalApiManager = new bdManagerApi();

export { BDMiddleWareAPI, globalApiManager };
