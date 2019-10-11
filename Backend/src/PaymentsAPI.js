var http  = require('http');



//orgTkn: origin token, amount: how much cost
//returns:
function requestTransaction(orgTkn,amount)
{
    var recivedData ='';

    
    console.log("query sended: "+Query);

    const data = JSON.stringify({
        query: Query
    })
  
  
}

//orgTkn: origin user, dest: destionation
function authTransaction(orgTkn,dest,amount,Callback)
{
  var recivedData ='';
  var requestPath = "/Payments/authTransaction/"+amount+"/"+orgTkn+"/"+dest
 
  const options = {
    hostname: 'localhost',
    port: 3007,
    path: requestPath,
    method: 'GET',
  }

  const req = http.request(options, res => {
    
    res.on('data', d => {
        recivedData += d;
        
       
    }).on('end',()=>
    {
      console.debug(recivedData)
      Callback(JSON.parse(recivedData));
    });
  })

  req.on('error', error => {
  console.error("error!!  "+error)
  })

req.end()
}


//usr: nombre de usuario
//returns: el dinero que tiene
function getFounds(usr)
{

}


//tkn: token de admin, usr: usuario a enviar dinero, amount: cantidad
function setFounds(tkn,usr,amount)
{

}


module.exports.requestTransaction = requestTransaction;
module.exports.authTransaction = authTransaction;
module.exports.getFounds = getFounds;
module.exports.setFounds = setFounds;