var http  = require('http');



//orgTkn: origin token, amount: how much cost
//returns:
function requestTransaction(orgTkn,amount)
{
    var recivedData ='';
    console.log("query sended: "+Query);
    //
    const data = JSON.stringify({
        query: Query
    })
  
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/payments/requestTransaction/',
    method: 'POST',
    headers: {
      'Content-Type'  : 'application/json',
      'Content-Length': data.length
    }
  }
  
    const req = http.request(options, res => {
      //console.log(`statusCode: ${res.statusCode}`)
      res.on('data', d => {
          recivedData += d;
          //console.log(d.toString());
      }).on('end',()=>
      {
        Callback(JSON.parse(recivedData));
      });
    })

    req.on('error', error => {
    console.error(error)
    })

  
  req.write(data)
  req.end()
}

//orgTkn: origin user, dest: destionation
function authTransaction(orgTkn,dest)
{

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