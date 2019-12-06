package interfaces;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface UserInterface extends Remote{
    String logIn(final String user, final String psw) throws RemoteException;
    String createUser(final String email, final String usr, final String psw) throws RemoteException;
    String deleteUser(final int tkn) throws RemoteException;
    String getAllUsers(final int tkn, final int idTypeOfUser) throws RemoteException;
    String updateUserById(final int tkn, final int idTypeOfUser) throws RemoteException;
    String getUserAmout(final int tkn) throws RemoteException;
}
