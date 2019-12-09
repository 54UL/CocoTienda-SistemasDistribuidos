package interfaces;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface UserInterface extends Remote{
    String LOGIN_FUN(String user, String psw) throws RemoteException;
    String CREATE_USER_CHECKIFEXISTS_FUN(String email) throws RemoteException;
    String CREATE_USER_CREATEUSER_FUN(String name, String email, String pass) throws RemoteException;
    String CREATE_USER_GIVEMONEY_FUN(String email, String pass) throws RemoteException;
    String CREATE_USER_GETCOCOACCOUNT_FUN() throws RemoteException;
    String CREATE_USER_CREATEACCOUNT_FUN(int ID_Cuenta, int ID_UsuarioGift) throws RemoteException;
    String DELETE_USER_FUN(int ID_Usuario) throws RemoteException;
    String GET_ALL_USERS_FUN() throws RemoteException;
    String UPDATE_USER_FUN(int ID_TipoUsuario, int ID_Usuario) throws RemoteException;
    String GET_USER_AMOUNT_NAME_FUN() throws RemoteException;
    String GET_USER_AMOUNT_GETIDCUENTA_FUN() throws RemoteException;
    String GET_USER_AMOUNT_GETSALDO_FUN() throws RemoteException;
}
