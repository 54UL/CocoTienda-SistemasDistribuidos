package usersrmiserver;

import java.rmi.AlreadyBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class UsersRMIServer {

    public static void main(String[] args) {
        // TODO code application logic here
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



