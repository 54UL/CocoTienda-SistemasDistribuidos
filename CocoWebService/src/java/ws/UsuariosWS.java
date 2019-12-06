package ws;

import interfaces.UsuariosInterface;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;

@WebService(serviceName = "UsuariosWebService")
public class UsuariosWS implements UsuariosInterface{

    @WebMethod(operationName = "hello")
    public String hello(@WebParam(name = "name") String txt) {
        return "Hello " + txt + " !";
    }
    
    @WebMethod(operationName = "LogIn")
    public int LogIn(){
        jorgePuto();
        //Execute method on the rmi server
        return 0;

    }
    
    @WebMethod(operationName = "createNewUser")
    public String createNewUser(){
        
        return "";
    }
    
    @WebMethod(operationName = "deleteUser")
    public String deleteUser(){
        
        return "";
    }
    
    @WebMethod(operationName = "getAllUsers")
    public String getAllUsers(){
        
        return "";
    }
    
    @WebMethod(operationName = "updateUserById")
    public String updateUserById(){
        
        return "";
    }
    
    @WebMethod(operationName = "getUserAmount")
    public String getUserAmount(){
        
        return "";
    }

    @Override
    public void jorgePuto() {
        
        
        
    }
   
}
