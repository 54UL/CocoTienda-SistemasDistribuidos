var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')
var  payments  = require('./PaymentsAPI.js') 

dbDriver.init();
var  bdApi = mwApi.globalApiManager.getApi("highlevel");


function retriveProducts(cat,cb)
{
   var queryString ="";
   if(cat!=0)
   {
    queryString = "SELECT * from Producto  where id_categoria  ="+cat;
   }
   else
   queryString = "SELECT * from Producto";

   bdApi.query(queryString,
   ( products )=>{
      console.debug(products)
      cb(products)
   });
   //categoy: home:0,tazas:1,camisas:2,llaveros:3,cachuchas:4
   /*
   switch(parseInt(cat,10))
   {
    case 0:
            products = 
              { "productos":[
              {id: "1", nombre:"cca",precio:"$666.6"},
              {id: "2",nombre:"llavero3",precio:"$234432.6"},
              {id: "3",nombre:"camisa",precio:"$234432.6"}, 
              {id: "1",nombre:"cachucha",precio:"$234432.6"},           
              ]}
              break;
      case 1:
            products = 
            { "productos":[
            {id: "1", nombre:"taza2",precio:"$666.6"},
            {id: "2",nombre:"taza3",precio:"$234432.6"},
            {id: "3",nombre:"taza4",precio:"$234432.6"},         
            ]}
    
            break;
      case 2:
             products = 
            { "productos":[
            {id: "4", nombre:"llavero3",precio:"$666.6"},
            {id: "5",nombre:"llavero2",precio:"$234432.6"},
            {id: "6",nombre:"llavero",precio:"$234432.6"},         
            ]}
           
           break;
     
     
      case 3:
             products = 
            { "productos":[
            {id: "23123" ,nombre:"camisa2",precio:"$666.6"},
            {id: "23123",nombre:"camisa3",precio:"$234432.6"},
            {id: "23123",nombre:"camisa4",precio:"$234432.6"},         
            ]}
            break;
     
      case 4:
             products = 
            { "productos":[
            {id: "23123" ,nombre:"cacucha1",precio:"$666.6"},
            {id: "23123",nombre:"cacucha2",precio:"$234432.6"},
            {id: "23123",nombre:"cacucha2",precio:"$234432.6"},         
            ]}

            break ;
        
            
   }; 
   cb(products)
  */
}


module.exports.retriveProducts = retriveProducts;