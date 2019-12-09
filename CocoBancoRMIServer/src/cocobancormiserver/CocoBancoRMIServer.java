/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cocobancormiserver;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import interfaces.CocoBancoInterface;
import java.rmi.AlreadyBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

/**
 *
 * @author David
 */
public class CocoBancoRMIServer {
     private static final int PORT = 9970;

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args)throws RemoteException, AlreadyBoundException {
        System.setProperty("java.rmi.server.hostname", "192.168.43.243");
        
        Remote remote = UnicastRemoteObject.exportObject(new CocoBancoInterface(){

            @Override
            public String createAccount(String NewAccountModel) throws RemoteException {
                Gson gson = new Gson();
                JsonObject jsonObject = gson.fromJson(NewAccountModel, JsonObject.class);
                jsonObject.get(fieldName); 
                return "v";
            }

            @Override
            public String updateAmount(int userTkn, double amount) throws RemoteException {
                throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
            }

            @Override
            public String deleteAccount(int userTkn) throws RemoteException {
                throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
            }

            @Override
            public String getAccounts() throws RemoteException {
                throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
            }
        
        },0);
        Registry registry = LocateRegistry.createRegistry(PORT);
       	System.out.println("[Payments RMI Server] -> Listening on: " + String.valueOf(PORT));
        registry.bind("CocoBanco", remote); // Registrar calculadora
        
    }
    
}
