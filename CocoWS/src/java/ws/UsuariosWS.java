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

@WebService(serviceName = "UsuariosWebService")
public class UsuariosWS
{
    private static final String IP = "192.168.43.124";
    private static final int PORT = 7070;
    private static Registry registry;
    private static UserInterface interfaz;
    
    static
    {
        try
        {
            System.out.println("[WS] -> Constructor block!");
            registry = LocateRegistry.getRegistry(IP, PORT);
            interfaz = (UserInterface) registry.lookup("UserRMIServer");
            System.out.println("[WS] -> Connection set!!!!");
        } 
        catch (RemoteException | NotBoundException ex) 
        {
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public UsuariosWS() 
    {
    }
    
    @WebMethod(operationName = "LOGIN_FUN")
    public String LOGIN_FUN(
            @WebParam(name="user")String user, 
            @WebParam(name="psw")String psw)
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> LOGIN_FUN");
            String res = interfaz.LOGIN_FUN(user, psw);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "CREATE_USER_CHECKIFEXISTS_FUN")
    public String CREATE_USER_CHECKIFEXISTS_FUN(
            @WebParam(name="email")String email)
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> CREATE_USER_CHECKIFEXISTS_FUN");
            String res = interfaz.CREATE_USER_CHECKIFEXISTS_FUN(email);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "CREATE_USER_CREATEUSER_FUN")
    public String CREATE_USER_CREATEUSER_FUN(
            @WebParam(name="name")String name, 
            @WebParam(name="email")String email, 
            @WebParam(name="pass")String pass)
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> CREATE_USER_CREATEUSER_FUN");
            String res = interfaz.CREATE_USER_CREATEUSER_FUN(name, email, pass);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "CREATE_USER_GIVEMONEY_FUN")
    public String CREATE_USER_GIVEMONEY_FUN(
            @WebParam(name="email")String email, 
            @WebParam(name="pass")String pass)
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> CREATE_USER_GIVEMONEY_FUN");
            String res = interfaz.CREATE_USER_GIVEMONEY_FUN(email, pass);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "CREATE_USER_GETCOCOACCOUNT_FUN")
    public String CREATE_USER_GETCOCOACCOUNT_FUN()
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> CREATE_USER_GETCOCOACCOUNT_FUN");
            String res = interfaz.CREATE_USER_GETCOCOACCOUNT_FUN();
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "CREATE_USER_CREATEACCOUNT_FUN")
    public String CREATE_USER_CREATEACCOUNT_FUN(
            @WebParam(name="idCuenta")int ID_Cuenta, 
            @WebParam(name="idUsuarioGift")int ID_UsuarioGift)
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> CREATE_USER_CREATEACCOUNT_FUN");
            String res = interfaz.CREATE_USER_CREATEACCOUNT_FUN(ID_Cuenta, ID_UsuarioGift);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "DELETE_USER_FUN")
    public String DELETE_USER_FUN(
            @WebParam(name="idUsuario")int ID_Usuario)
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> DELETE_USER_FUN");
            String res = interfaz.DELETE_USER_FUN(ID_Usuario);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "GET_ALL_USERS_FUN")
    public String GET_ALL_USERS_FUN()
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> GET_ALL_USERS_FUN");
            String res = interfaz.GET_ALL_USERS_FUN();
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "UPDATE_USER_FUN")
    public String UPDATE_USER_FUN(
            @WebParam(name="idTipoUsuario")int ID_TipoUsuario, 
            @WebParam(name="idUsuario")int ID_Usuario)
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> UPDATE_USER_FUN");
            String res = interfaz.UPDATE_USER_FUN(ID_TipoUsuario, ID_Usuario);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "GET_USER_AMOUNT_NAME_FUN")
    public String GET_USER_AMOUNT_NAME_FUN(
            @WebParam(name="idUsuario")int ID_Usuario)
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> GET_USER_AMOUNT_NAME_FUN");
            String res = interfaz.GET_USER_AMOUNT_NAME_FUN(ID_Usuario);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "GET_USER_AMOUNT_GETIDCUENTA_FUN")
    public String GET_USER_AMOUNT_GETIDCUENTA_FUN(
            @WebParam(name="idUsuarioGift")int ID_UsuarioGift)
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> GET_USER_AMOUNT_GETIDCUENTA_FUN");
            String res = interfaz.GET_USER_AMOUNT_GETIDCUENTA_FUN(ID_UsuarioGift);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    @WebMethod(operationName = "GET_USER_AMOUNT_GETSALDO_FUN")
    public String GET_USER_AMOUNT_GETSALDO_FUN(
            @WebParam(name="idCuenta")int ID_Cuenta)
    {
        try 
        {
            System.out.println("INSIDE WEB METHOD -> GET_USER_AMOUNT_GETSALDO_FUN");
            String res = interfaz.GET_USER_AMOUNT_GETSALDO_FUN(ID_Cuenta);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "NULL";
        }
    }
    
    
    
    
    
    
    
    
    
    @WebMethod(operationName = "createNewUser")
    public String wsCreateNewUser(
            @WebParam(name="name") String name,
            @WebParam(name="email") String email,
            @WebParam(name="pass") String pass)
    {
        try {
            
            System.out.println("JUST DO IT!");
            
            interfaz.CREATE_USER_CREATEUSER_FUN(name, email, pass);
            
            return "";
            
        } catch (RemoteException ex) {
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "nada";
    }
    
   
}