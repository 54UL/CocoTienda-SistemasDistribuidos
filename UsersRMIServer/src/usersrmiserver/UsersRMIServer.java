package usersrmiserver;

import Singleton.Em;
import interfaces.ServerCts;
import interfaces.UserInterface;
import java.rmi.AlreadyBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import javax.persistence.Query;


public class UsersRMIServer implements ServerCts{

    private static final int PORT = 9970;
    
    public static void main(String[] args) throws RemoteException, AlreadyBoundException{
        Remote remote = UnicastRemoteObject.exportObject(new UserInterface(){
            @Override
            public String logIn(String user, String psw) throws RemoteException {
                throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
            }

            @Override
            public String createUser(String email, String usr, String psw) throws RemoteException {
                
                if(checkIfUserExists(email)){
                   return "hola";
                }
               
                
                return "null";
            }

            @Override
            public String deleteUser(int tkn) throws RemoteException {
                return "";
            }

            @Override
            public String getAllUsers(int tkn, int idTypeOfUser) throws RemoteException {
                                return "";

            }

            @Override
            public String updateUserById(int tkn, int idTypeOfUser) throws RemoteException {
                                return "";

            }

            @Override
            public String getUserAmout(int tkn) throws RemoteException {
                                return "";

            }                                
        },0);
       
        Registry registry = LocateRegistry.createRegistry(PORT);
       	System.out.println("[Users RMI Server] -> Listening on: " + String.valueOf(PORT));
        registry.bind("User", remote);
    }
    
    private static boolean checkIfUserExists(final String email){

        String queryString = "select u.id_usuario from Usuario u " +
                         "where u.correo = "+email;
        Query query = Em.get().createQuery(queryString); 
        return query.getResultList() == null;     
    }
    
    private static boolean insertNewUserRecord(String usr){
        
        boolean state = false;
        try {
            
        } catch (Exception e) {
            System.out.println(USER_SERVER_ERROR + e.toString());
        }
        return state;
    }
    
    private static boolean insertNewCocobancoAccnt(final String email, final String pass){
        
        boolean state = false;
        try {
            
        } catch (Exception e) {
            System.out.println(USER_SERVER_ERROR + e.toString());
        }
        return state;
    }
    
    private static boolean insertNewAccount(final String email, final String pass){
        
        boolean state = false;
        try {
            
        } catch (Exception e) {
            System.out.println(USER_SERVER_ERROR + e.toString());
        }
        return state;
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



