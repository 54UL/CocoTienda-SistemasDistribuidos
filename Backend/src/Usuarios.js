//API DE USUARIOS
import {globalApiManager} from "BDMiddleWareApi.js";




/*
function createProductView()
{

    return "<div class="col-md-3 col-xs-6">
    <div class="product">
        <div class="product-img">
            <img src="img/Tazas/Tshit.jpg" alt="">
        </div>
        <div class="product-body">
            <p class="product-category">SHIT</p>
            <h3 class="product-name"><a href="#">TAZA DE PLASTICO CON FRASE</a></h3>
            <h4 class="product-price">$281.00</h4>
            <div class="product-btns">
                <button class="add-to-wishlist"><i class="fa fa-heart-o"></i></button>
                <button class="add-to-cart"><i class="fa fa-shopping-cart"></i></button>
            </div>
        </div>
    </div>
</div>"
}
/*

var MAX_ELEMENTS=400
var generatedTokens[MAX_ELEMENTS];

bd = globalApiManager.getApi("highlevel");

function verifyToken(token)
{


}

function generateToken()
{

return 1;
}

function logIn(user,pass)
{
    //"{0}{1}".format("{1}", "{0}")

  var Query ="SELECT user,pass FROM TUSUARIOS WHERE user==${user} AND pass==${pass}";
  var rows=  bd.query(Query);
  var token;

  if(rows['usuario'] !=null)
  {
    if(row['password'] !=null )
    {
        return generateToken();
    }
  }

  return 0;
}

function createUser()
{

}

function deleteUser()
{


}

function getUser(id)
{


}

function getUserPriviliges(id)
{


}

export{logIn,verifyToken}