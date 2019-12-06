package interfaces;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface PaymentsInterface extends Remote{
    String authTransaction(final int orgTkn, final int dest, final double amount) throws RemoteException;
    String getFounds(final int userTkn) throws RemoteException;
    String setFounds(final int tkn, final double amount) throws RemoteException;    
}
