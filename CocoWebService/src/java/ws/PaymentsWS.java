/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import interfaces.PaymentsInterface;
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
    private static PaymentsInterface interfaz;
    
    public PaymentsWS(){
        try{
            System.out.println("[WS] -> Constructor block!");
            registry = LocateRegistry.getRegistry(IP, PORT);
            interfaz = (PaymentsInterface) registry.lookup("Payments");
            System.out.println("[WS] -> Connection set!!!!");

        } catch (RemoteException | NotBoundException ex) {
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    @WebMethod(operationName = "authTransaction")
    public String authTransactionWS(
            @WebParam(name = "token") int orgTkn,
            @WebParam(name = "destinatario") int dest,
            @WebParam(name = "amount") Double amount
    ){
        try{
            String response = interfaz.authTransaction(orgTkn, dest, amount);
            System.out.println(response);
            return response;
        }
        catch (RemoteException ex){
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);   
            return "{\"transaction\":0,\"msg\":\""+ex.getMessage()+"\"}";
        }
    }
    public String getFoundsJsonWS(
            @WebParam(name ="token")int orgTkn
    ){
        try{
            String response = interfaz.getFoundsJson(orgTkn);
            System.out.println(response);
            return response;
        }
        catch (RemoteException ex){
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);   
            return "{\"transaction\":0,\"msg\":\""+ex.getMessage()+"\"}";
        }
    }
    public String setFoundsWS(
            @WebParam(name="token")int orgTkn,
            @WebParam(name="founds")double founds
    ){
        try{
            String response = interfaz.setFounds(orgTkn,founds);
            System.out.println(response);
            return response;
        }
        catch (RemoteException ex){
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);   
            return "{\"transaction\":0,\"msg\":\""+ex.getMessage()+"\"}";
        }
    }
   
}
