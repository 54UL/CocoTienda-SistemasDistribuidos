
var CURRENT_IP = "192.168.1.107:3000"

 function getBaseUrl(){

	return  "http://"+CURRENT_IP;
}

 function endpoint(endpointURL){

    return getBaseUrl()+endpointURL;
}

 function getUserToken(){
	 console.log("COOKIE DE USUARIO: "+document.cookie)
	return document.cookie;
}


