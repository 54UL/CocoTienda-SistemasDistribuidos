/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import interfaces.CocoBancoInterface;
import interfaces.PaymentsInterface;
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

@WebService(serviceName = "CocoBancoWS")
public class CocoBancoWS {
    private static final String IP = "192.168.43.243";
    private static final int PORT = 9970;
    private static Registry registry;
    private static CocoBancoInterface interfaz;
    
    public CocoBancoWS(){
        try{
            System.out.println("[WS] -> Constructor block!");
            registry = LocateRegistry.getRegistry(IP, PORT);
            interfaz = (CocoBancoInterface) registry.lookup("CocoBanco");
            System.out.println("[WS] -> Connection set!!!!");

        } catch (RemoteException | NotBoundException ex) {
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
     @WebMethod(operationName = "updateAmount")
     public String updateAmountWS(
             @WebParam(name = "token") int orgTkn,
             @WebParam(name = "amount") double amount
     ){
         try{
            String response = interfaz.updateAmount(orgTkn, amount);
            System.out.println(response);
            return response;
        }
        catch (RemoteException ex){
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);   
            return "{\"msg\":\"ERRO\",\"result\":\"0\"}";
        }
     }
     @WebMethod(operationName = "deleteAccount")
     public String deleteAccountWS(
             @WebParam(name = "token") int orgTkn
     ){
         try{
            String response = interfaz.deleteAccount(orgTkn);
            System.out.println(response);
            return response;
             
         }
         catch (RemoteException ex){
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);   
            return "{\"msg\":\"ERROR\",\"result\":\"0\"}";
        }
     }
     @WebMethod(operationName = "getAccounts")
     public String getAccountsWS(){
         try{
            String response = interfaz.getAccounts();
            System.out.println(response);
            return response;
             
         }
            catch (RemoteException ex){
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);   
            return "{\"msg\":\"ERROR\",\"result\":\"0\"}";
        } 
     }
}
