//MIDDLE WARE CORE API


class BDMiddleWareAPI {
    constructor(ApiName,BdEndpoint,User,Pass,QueryFn,ConfigFn,ConnectFn) {
        this.apiName = ApiName;
        this.bdenpoint = BdEndpoint;
        this.user = User;
        this.pass = Pass;
        this.query = QueryFn
        this.config = ConfigFn
        this.connect = ConnectFn

    }
}

var MAX_APIS =2;
class BDManagerApi
{ 
    constructor()
    {
        this.apiInstances= new Array(MAX_APIS);
        this.apiCount = 0;
   
        this.addApi = function (api)
        {  
        
            var currentIndex = this.apiCount++;
            if(currentIndex<MAX_APIS)
            this.apiInstances.push(api);
            else
            console.log("cannot add more bd API'S");
        }
        this.getApi = function(name)
        {
               // console.log("apis  "+this.apiInstances.vaapiName);
                //might be string compare ?
             var selectedApi =    new BDMiddleWareAPI();
                this.apiInstances.find((e)=>
                {   
                    if(e!=undefined)
                    { 
                        if(e.apiName === name)
                        selectedApi= e;  
                    }
                });  
            return selectedApi
        }
    }
}
var  globalApiManager = new BDManagerApi();


module.exports.globalApiManager = globalApiManager;
module.exports.BDMiddleWareAPI  = BDMiddleWareAPI;
module.exports.BDManagerApi     = BDManagerApi;

