package paymentsrmiserver;

import interfaces.PaymentsInterface;
import java.rmi.AlreadyBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class PaymentsRMIServer {

    private static final int PORT = 9970;
    
    public static void main(String[] args) throws RemoteException, AlreadyBoundException {
        Remote remote = UnicastRemoteObject.exportObject(new PaymentsInterface(){
            @Override
            public String authTransaction(int orgTkn, int dest, double amount) throws RemoteException {
                throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
            }

            @Override
            public String getFounds(int userTkn) throws RemoteException {
                throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
            }

            @Override
            public String setFounds(int tkn, double amount) throws RemoteException {
                throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
            }
            
        },0);
        
        Registry registry = LocateRegistry.createRegistry(PORT);
       	System.out.println("[Payments RMI Server] -> Listening on: " + String.valueOf(PORT));
        registry.bind("Payments", remote); // Registrar calculadora
        
    }
    
}
