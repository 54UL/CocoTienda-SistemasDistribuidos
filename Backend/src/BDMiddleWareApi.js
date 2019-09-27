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
        this.apiInstances= new Array(3);
        this.apiCount = 0;
        this.init = function()
        {
            //this.apiInstances = new BDManagerApi[2];
            //this.apiInstances = new Array(MAX_APIS);
        }
        this.addApi = function (api)
        {  
            console.log("api:  "+api.apiName);
            var currentIndex = this.apiCount++;
            console.log("current index api "+currentIndex);
            if(currentIndex<2)
            this.apiInstances.push(api);
            else
            console.log("cannot add more bd API'S");
        }
        this.getApi = function(name)
        {
               // console.log("apis  "+this.apiInstances.vaapiName);
                //might be string compare ?
                this.apiInstances.find((e)=>
                {
                    if(e == name)
                    {
                        return globalApiManager.apiInstances[i];
                    }
                });    
        }
    }
}
var  globalApiManager = new BDManagerApi();


module.exports.globalApiManager = globalApiManager;
module.exports.BDMiddleWareAPI  = BDMiddleWareAPI;
module.exports.BDManagerApi     = BDManagerApi;

