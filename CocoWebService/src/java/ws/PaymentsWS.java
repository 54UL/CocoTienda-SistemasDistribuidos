/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import interfaces.UserInterface;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

/**
 *
 * @author isaac
 */
@WebService(serviceName = "PaymentsWS")
public class PaymentsWS {
    
    private static final String IP = "192.168.1.71";
    private static final int PORT = 9970;
    private static Registry registry;
    private static UserInterface interfaz;
    
    public PaymentsWS(){
        try{
            System.out.println("[WS] -> Constructor block!");
            registry = LocateRegistry.getRegistry(IP, PORT);
            interfaz = (UserInterface) registry.lookup("User");
            System.out.println("[WS] -> Connection set!!!!");

        } catch (RemoteException | NotBoundException ex) {
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    @WebMethod(operationName = "authTransaction")
    public String hello(
            @WebParam(name = "name") String txt
    ){
        return "Hello " + txt + " !";
    }

    
}
