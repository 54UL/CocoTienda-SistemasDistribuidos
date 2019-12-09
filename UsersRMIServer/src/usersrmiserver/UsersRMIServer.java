package usersrmiserver;

import Entities.Cocobanco;
import Entities.Cuentas;
import Entities.Usuario;
import Singleton.Em;
import interfaces.ServerCts;
import static interfaces.ServerCts.USER_SERVER_INFO;
import interfaces.UserInterface;
import java.rmi.AlreadyBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.List;
import javax.persistence.Query;

import com.google.gson.Gson;


public class UsersRMIServer implements ServerCts
{
    //PORT
    private static final int PORT = 7070;
    
    //LOGIN
    private static final String LOGIN = "SELECT u FROM Usuario u WHERE u.correo = :email AND u.contrasenia = :pass";
    
    //CREATE USER
    private static final String CREATE_USER_CHECKIFEXISTS = "SELECT u FROM Usuario u WHERE u.correo = :email";
    private static final String CREATE_USER_CREATEUSER = "INSERT INTO Usuario VALUES (0, 2, ?, ?, ?)";
    private static final String CREATE_USER_GIVEMONEY = "INSERT INTO Cocobanco VALUES (0, 100000, ?, ?)";
    private static final String CREATE_USER_GETCOCOACCOUNT = "SELECT MAX(c.ID_Cuenta) AS AMOUNT_OF_ACCOUNTS FROM Cocobanco c";
    private static final String CREATE_USER_CREATEACCOUNT = "INSERT INTO Cuentas VALUES (0, ?, ?)";
    
    //DELETE USER
    private static final String DELETE_USER = "DELETE FROM Usuario u WHERE u.ID_Usuario = :idUsuario";
    
    //GET ALL USERS
    private static final String GET_ALL_USERS = "SELECT u FROM Usuario u WHERE u.eliminado = 0";
    
    //UPDATE USER BY ID
    private static final String UPDATE_USER = "UPDATE Usuario u SET u.id_tipousuario = :type WHERE u.id_usuario = :idUsuario";
    
    //GET USER AMOUNT 
    private static final String GET_USER_AMOUNT_NAME = "SELECT u.nombre FROM Usuario u WHERE u.id_usuario = :idUsuario";
    private static final String GET_USER_AMOUNT_GETIDCUENTA = "SELECT c.ID_Cuenta FROM Cuentas c WHERE c.ID_UsuarioGift = :idUsuario";
    private static final String GET_USER_AMOUNT_GETSALDO = "SELECT c.Saldo FROM Cocobanco c WHERE c.ID_Cuenta = :idCuenta";
    
    
    public static void main(String[] args) throws RemoteException, AlreadyBoundException
    {
        System.setProperty("java.rmi.server.hostname", "192.168.1.82");
        
        Remote remote = UnicastRemoteObject.exportObject(new UserInterface()
        {
            @Override
            public String LOGIN_FUN(String user, String psw) throws RemoteException 
            {
                System.out.println(USER_SERVER_INFO + "ON LOGIN_FUN");
                
                Query query = Em.get().createQuery(LOGIN); 
                query.setParameter("email", user);
                query.setParameter("pass", psw);

                List<Usuario> list = query.getResultList(); 
                
                if(list != null)
                {
                    String res = new Gson().toJson(list);
                    
                    System.out.println("RES: " + res);
                    
                    return res;
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            @Override 
            public String CREATE_USER_CHECKIFEXISTS_FUN(String email)
            {
                System.out.println(USER_SERVER_INFO + "ON CREATE_USER_CHECKIFEXISTS_FUN");
                
                Query query = Em.get().createQuery(CREATE_USER_CHECKIFEXISTS); 
                query.setParameter("email", email);

                List<Usuario> list = query.getResultList(); 
                
                if(list != null)
                {
                    String res = new Gson().toJson(list);
                    
                    System.out.println("RES: " + res);
                    
                    return res;
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            @Override 
            public String CREATE_USER_CREATEUSER_FUN(String name, String email, String pass)
            {
                System.out.println(USER_SERVER_INFO + "ON CREATE_USER_CREATEUSER_FUN");
                
                Query query = Em.get().createQuery(CREATE_USER_CREATEUSER); 
                query.setParameter(1, name);
                query.setParameter(2, email);
                query.setParameter(3, pass);

                int res = query.executeUpdate();
                
                if(res > 0)
                {
                    System.out.println("RES: " + res);
                    
                    return res + "";
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            @Override
            public String CREATE_USER_GIVEMONEY_FUN(String email, String pass)
            {
                System.out.println(USER_SERVER_INFO + "ON CREATE_USER_GIVEMONEY_FUN");
                
                Query query = Em.get().createQuery(CREATE_USER_GIVEMONEY); 
                query.setParameter(1, email);
                query.setParameter(2, pass);

                int res = query.executeUpdate();
                
                if(res > 0)
                {
                    System.out.println("RES: " + res);
                    
                    return res + "";
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            @Override
            public String CREATE_USER_GETCOCOACCOUNT_FUN()
            {
                System.out.println(USER_SERVER_INFO + "ON CREATE_USER_GETCOCOACCOUNT_FUN");
                
                Query query = Em.get().createQuery(CREATE_USER_GETCOCOACCOUNT); 

                List<Cocobanco> list = query.getResultList(); 
                
                if(list != null)
                {
                    String res = new Gson().toJson(list);
                    
                    System.out.println("RES: " + res);
                    
                    return res;
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            @Override 
            public String CREATE_USER_CREATEACCOUNT_FUN(int ID_Cuenta, int ID_UsuarioGift)
            {
                System.out.println(USER_SERVER_INFO + "ON CREATE_USER_CREATEACCOUNT_FUN");
                
                Query query = Em.get().createQuery(CREATE_USER_CREATEACCOUNT); 
                query.setParameter(1, ID_Cuenta);
                query.setParameter(2, ID_UsuarioGift);

                int res = query.executeUpdate();
                
                if(res > 0)
                {
                    System.out.println("RES: " + res);
                    
                    return res + "";
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            @Override 
            public String DELETE_USER_FUN(int ID_Usuario)
            {
                System.out.println(USER_SERVER_INFO + "ON DELETE_USER_FUN");
                
                Query query = Em.get().createQuery(DELETE_USER); 
                query.setParameter("idUsuario", ID_Usuario);

                int res = query.executeUpdate();
                
                if(res > 0)
                {
                    System.out.println("RES: " + res);
                    
                    return res + "";
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            @Override
            public String GET_ALL_USERS_FUN()
            {
                System.out.println(USER_SERVER_INFO + "ON GET_ALL_USERS_FUN");
                
                Query query = Em.get().createQuery(GET_ALL_USERS); 

                List<Usuario> list = query.getResultList(); 
                
                if(list != null)
                {
                    String res = new Gson().toJson(list);
                    
                    System.out.println("RES: " + res);
                    
                    return res;
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            @Override
            public String UPDATE_USER_FUN(int ID_TipoUsuario, int ID_Usuario)
            {
                System.out.println(USER_SERVER_INFO + "ON UPDATE_USER");
                
                Query query = Em.get().createQuery(UPDATE_USER); 
                query.setParameter("idType", ID_TipoUsuario);
                query.setParameter("idUsuario", ID_Usuario);

                int res = query.executeUpdate();
                
                if(res > 0)
                {
                    System.out.println("RES: " + res);
                    
                    return res + "";
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            @Override
            public String GET_USER_AMOUNT_NAME_FUN()
            {
                System.out.println(USER_SERVER_INFO + "ON GET_USER_AMOUNT_NAME");
                
                Query query = Em.get().createQuery(GET_USER_AMOUNT_NAME); 

                List<Usuario> list = query.getResultList(); 
                
                if(list != null)
                {
                    String res = new Gson().toJson(list);
                    
                    System.out.println("RES: " + res);
                    
                    return res;
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            
            @Override
            public String GET_USER_AMOUNT_GETIDCUENTA_FUN()
            {
                System.out.println(USER_SERVER_INFO + "ON GET_USER_AMOUNT_GETIDCUENTA");
                
                Query query = Em.get().createQuery(GET_USER_AMOUNT_GETIDCUENTA); 

                List<Cuentas> list = query.getResultList(); 
                
                if(list != null)
                {
                    String res = new Gson().toJson(list);
                    
                    System.out.println("RES: " + res);
                    
                    return res;
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
            
            @Override
            public String GET_USER_AMOUNT_GETSALDO_FUN()
            {
                System.out.println(USER_SERVER_INFO + "ON GET_USER_AMOUNT_GETSALDO_FUN");
                
                Query query = Em.get().createQuery(GET_USER_AMOUNT_GETSALDO); 

                List<Cocobanco> list = query.getResultList(); 
                
                if(list != null)
                {
                    String res = new Gson().toJson(list);
                    
                    System.out.println("RES: " + res);
                    
                    return res;
                }
                else
                {
                    System.out.println("RES: NULL");
                    
                    return "NULL";
                }
            }
                  
        },0);
       
        Registry registry = LocateRegistry.createRegistry(PORT);
        
       	System.out.println("[Users RMI Server] -> Listening on: " + String.valueOf(PORT));
        
        registry.bind("UserRMIServer", remote);
        
        System.out.println(USER_SERVER_INFO + "Registry binded!");
    }
    
    
    
}


//Servidor

//package rmiserver;
//
//import java.rmi.AlreadyBoundException;
//import java.rmi.Remote;
//import java.rmi.RemoteException;
//import java.rmi.registry.LocateRegistry;
//import java.rmi.registry.Registry;
//import java.rmi.server.UnicastRemoteObject;
//
//public class RMIServer {
//	private static final int PUERTO = 1100; //Si cambias aquí el puerto, recuerda cambiarlo en el cliente
//    public static void main(String[] args) throws RemoteException, AlreadyBoundException {
//        Remote remote = UnicastRemoteObject.exportObject(new RMIInterface() {
//        	/*
//				Sobrescribir opcionalmente los métodos que escribimos en la interfaz
//        	*/
//            @Override
//            public float sumar(float numero1, float numero2) throws RemoteException {
//                
//                
//                return numero1 + numero2;
//            };
//
//            @Override
//            public float restar(float numero1, float numero2) throws RemoteException {
//                return numero1 - numero2;
//            };
//
//            @Override
//            public float multiplicar(float numero1, float numero2) throws RemoteException {
//                return numero1 * numero2;
//            };
//
//            @Override
//            public float dividir(float numero1, float numero2) throws RemoteException {
//                return numero1 / numero2;
//            };
//        }, 0);
//        Registry registry = LocateRegistry.createRegistry(PUERTO);
//       	System.out.println("Servidor escuchando en el puerto " + String.valueOf(PUERTO));
//        registry.bind("Calculadora", remote); // Registrar calculadora
//    }
//}


//Cliente aunque diga server

//package rmiserver;
//
//import java.rmi.NotBoundException;
//import java.rmi.RemoteException;
//import java.rmi.registry.LocateRegistry;
//import java.rmi.registry.Registry;
//import java.util.Scanner;
//
//
//public class RMIServer {
//
//    private static final String IP = "192.168.84.110"; // Puedes cambiar a localhost
//    private static final int PUERTO = 1100; //Si cambias aquí el puerto, recuerda cambiarlo en el servidor
//    public static void main(String[] args) throws RemoteException, NotBoundException {
//        // TODO code application logic here
//        Registry registry = LocateRegistry.getRegistry(IP, PUERTO);
//        RMIInterface interfaz = (RMIInterface) registry.lookup("Calculadora"); //Buscar en el registro...
//        Scanner sc = new Scanner(System.in);
//        int eleccion;
//        float numero1, numero2, resultado = 0;
//        
//         
//
//            	System.out.println("Ingresa el número 1: ");
//            	try{
//                	numero1 = Float.parseFloat(sc.nextLine());
//            	}catch(NumberFormatException e){
//            		numero1 = 0;
//            	}
//
//            	System.out.println("Ingresa el número 2: ");
//            	try{
//                	numero2 = Float.parseFloat(sc.nextLine());
//            	}catch(NumberFormatException e){
//            		numero2 = 0;
//            	}
//               
//	           
//	                    resultado = interfaz.sumar(numero1, numero2);
//	               
//	            
//
//                System.out.println("El resultado es " + String.valueOf(resultado));
//                sc.nextLine();
//            
//        
//    }
//    
//}



