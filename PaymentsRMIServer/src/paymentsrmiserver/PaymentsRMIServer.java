package paymentsrmiserver;

import Entities.Cocobanco;
import Entities.Cuentas;
import Singleton.Em;
import com.google.gson.Gson;
import interfaces.PaymentsInterface;
import java.rmi.AlreadyBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Query;

public class PaymentsRMIServer {

    private static final int PORT = 9970;
    
    public static void main(String[] args) throws RemoteException, AlreadyBoundException {
        System.setProperty("java.rmi.server.hostname", "192.168.43.243");
        
        Remote remote = UnicastRemoteObject.exportObject(new PaymentsInterface(){
            @Override
            public String authTransaction(int orgTkn, int dest, double amount) throws RemoteException {
                String response_model="";
                try{
                    String founds = getFounds(orgTkn);
                    if(founds.equals("usuario no encontrado")){
                        response_model="{\"transaction\":0,\"msg\":\"Usuario no encontrado\"}";
                    }
                    else{
                        if(Double.parseDouble(founds)>0 && Double.parseDouble(founds)>= amount){
                            Double auxfounds=Double.parseDouble(founds)-amount;
                            String founds_coco = setFounds(orgTkn,auxfounds);
                             
                            if(founds_coco.equals("Imposible actualizar saldo")){
                                 response_model="{\"transaction\":0,\"msg\":\"Imposible actualizar fondos\"}";
                            }
                            else{
                                founds_coco = getFounds(dest);
                                System.out.println(founds_coco);
                                auxfounds=Double.parseDouble(founds_coco)+amount;
                                setFounds(dest,Double.valueOf(auxfounds));
                                response_model="{\"transaction\":1,\"msg\":\"Transaccion realizada con exito\"}";
                            }
                        }
                        else{
                            response_model="{\"transaction\":0,\"msg\":\"Fondos insuficientes\"}";
                        }
                    }
                }
                catch(Exception ex){
                    response_model="{\"transaction\":0,\"msg\":\""+ex.getMessage()+"\"}";
                }
                System.out.println(response_model);
                return response_model;
            }

            @Override
            public String getFounds(int userTkn) throws RemoteException {
                String response_model="";
                List<Cuentas>cuentas = new ArrayList<Cuentas>();
                List<Cocobanco>banco = new ArrayList<Cocobanco>();                
                try{
                    Query query = Em.get().createQuery("SELECT c FROM Cuentas c WHERE c.iDUsuarioGift.idUsuario = "+userTkn);
                    cuentas = query.getResultList();
                    if(cuentas.size() > 0){
                        userTkn=cuentas.get(0).getIDCuenta();
                        query = Em.get().createQuery("SELECT c from Cocobanco c where c.iDCuenta=:id_cuenta");
                        query.setParameter("id_cuenta",userTkn);
                        banco = query.getResultList();
                        response_model = String.valueOf(banco.get(0).getSaldo());
                    }  
                    else{
                        response_model = "usuario no encontrado";   
                    }
                }
                catch(Exception ex){
                    response_model = "usuario no encontrado";  
                    System.out.println(ex.getMessage());
                }
                System.out.println("Saldo->"+response_model);
                return response_model;
            }
            
            @Override
            public String getFoundsJson(int userTkn) throws RemoteException {
                String response_model="";
                List<Cuentas>cuentas = new ArrayList<Cuentas>();
                List<Cocobanco>banco = new ArrayList<Cocobanco>();                
                try{
                    Query query = Em.get().createQuery("SELECT c FROM Cuentas c WHERE c.iDUsuarioGift.idUsuario = "+userTkn);
                    cuentas = query.getResultList();
                    if(cuentas.size() > 0){
                        userTkn=cuentas.get(0).getIDCuenta();
                        query = Em.get().createQuery("SELECT c from Cocobanco c where c.iDCuenta=:id_cuenta");
                        query.setParameter("id_cuenta",userTkn);
                        banco = query.getResultList();
                        response_model = "{\"status\":\"ok\",\"errorCode\":\"0\",\"errorMessage\":\"null\",\"founds\":\""+banco.get(0).getSaldo()+"\"}";
                    }  
                    else{
                        response_model = "{\"status\":\"error\",\"errorCode\":\"1\",\"errorMessage\":\"User not found\"}";   
                    }
                }
                catch(Exception ex){
                    response_model = "{\"status\":\"error\",\"errorCode\":\"1\",\"errorMessage\":\"User not found\"}"; 
                    System.out.println(ex.getMessage());
                }
                System.out.println(response_model);
                return response_model;
            }

            @Override
                public String setFounds(int tkn, double amount) throws RemoteException {
                String response_model="";
                List<Cuentas>cuentas = new ArrayList<Cuentas>();
                List<Cocobanco>banco = new ArrayList<Cocobanco>();
                try{
                    Query query = Em.get().createQuery("SELECT c FROM Cuentas c WHERE c.iDUsuarioGift.idUsuario=:token");
                    query.setParameter("token", tkn);
                    cuentas = query.getResultList();
                    if(cuentas.size()>0){
                       int id_cocobanco = cuentas.get(0).getIDCuenta();
                        Cocobanco cocobanco = Em.get().find(Cocobanco.class, id_cocobanco);
                        Em.get().getTransaction().begin();
                        cocobanco.setSaldo(amount);
                        Em.get().getTransaction().commit();
                        response_model="Saldo actualizado";
                    }
                    else{
                        response_model="Imposible actualizar saldo";
                    }
                }
                catch(Exception ex){
                    response_model="Imposible actualizar saldo";
                }
                return response_model;               
            }

            @Override
            public String setFoundsJson(int tkn, double amount) throws RemoteException {
                String response_model="";
                List<Cuentas>cuentas = new ArrayList<Cuentas>();
                List<Cocobanco>banco = new ArrayList<Cocobanco>();
                try{
                    Query query = Em.get().createQuery("SELECT c FROM Cuentas c WHERE c.iDUsuarioGift.idUsuario=:token");
                    query.setParameter("token", tkn);
                    cuentas = query.getResultList();
                    if(cuentas.size()>0){
                        int id_cocobanco = cuentas.get(0).getIDCuenta();
                        Cocobanco cocobanco = Em.get().find(Cocobanco.class, id_cocobanco);
                        Em.get().getTransaction().begin();
                        cocobanco.setSaldo(amount);
                        Em.get().getTransaction().commit();
                        response_model="Saldo actualizado";
                    }
                    else{
                        response_model="Imposible actualizar saldo";
                    }
                }
                catch(Exception ex){
                    response_model="Imposible actualizar saldo";
                }
                return response_model;
            }
        },0);
        
        Registry registry = LocateRegistry.createRegistry(PORT);
       	System.out.println("[Payments RMI Server] -> Listening on: " + String.valueOf(PORT));
        registry.bind("Payments", remote); // Registrar calculadora
        
    }
    
}
