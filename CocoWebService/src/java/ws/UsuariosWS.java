package ws;

import java.rmi.RemoteException;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import interfaces.UserInterface;
import java.rmi.NotBoundException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebService(serviceName = "UsuariosWebService")
public class UsuariosWS{
    
    private static final String IP = "192.168.1.71";
    private static final int PORT = 9970;
    private static Registry registry;
    private static UserInterface interfaz;

    public UsuariosWS() {
        try {
            System.out.println("[WS] -> Constructor block!");
            registry = LocateRegistry.getRegistry(IP, PORT);
            interfaz = (UserInterface) registry.lookup("User");
            System.out.println("[WS] -> Connection set!!!!");

        } catch (RemoteException | NotBoundException ex) {
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
            
    @WebMethod(operationName = "hello")
    public String hello(@WebParam(name = "name") String txt) {
        return "Hello " + txt + " !";
    }
    
    @WebMethod(operationName = "LogIn")
    public int LogIn(){
       
        //Execute method on the rmi server
        return 0;

    }
    
    @WebMethod(operationName = "createNewUser")
    public String wsCreateNewUser(
            @WebParam(name="nombre") String nombre,
            @WebParam(name="email") String email

    
    ){
        try {
            String response = interfaz.createUser(email, nombre, email);
          
            System.out.println(response);
            return response;
        } catch (RemoteException ex) {
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "nada";
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
  
    
   
}
