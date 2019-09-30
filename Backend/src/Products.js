var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')
var  payments  = require('./PaymentsAPI.js') 

dbDriver.init();
var  bdApi = mwApi.globalApiManager.getApi("highlevel");
