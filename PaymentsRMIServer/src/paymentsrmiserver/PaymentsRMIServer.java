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
                        if(Integer.parseInt(founds)>0 && Double.parseDouble(founds)>= amount){
                            founds = String.valueOf(Double.parseDouble(founds)-amount);
                            setFounds(orgTkn,Double.valueOf(founds));
                            String founds_coco = getFounds(dest);
                            if(founds_coco.equals("Imposible actualizar saldo")){
                                 response_model="{\"transaction\":0,\"msg\":\"Imposible actualzar fondos\"}";
                            }
                            else{
                                founds_coco = String.valueOf(Double.parseDouble(founds)+amount);
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
                return response_model;
            }

            @Override
            public String getFounds(int userTkn) throws RemoteException {
                String response_model="";
                List<Cuentas>cuentas = new ArrayList<Cuentas>();
                List<Cocobanco>banco = new ArrayList<Cocobanco>();                
                try{
                    Query query = Em.get().createQuery("SELECT c from cuentas c where c.ID_UsuarioGift.ID_UsuarioGift= :id_usuario");
                    query.setParameter("id_usuario", userTkn);
                    cuentas = query.getResultList();
                    if(cuentas.size() > 0){
                        userTkn=cuentas.get(0).getIDCuenta();
                        query = Em.get().createQuery("SELECT c from cocobanco c where c.ID_Cuenta=:id_cuenta");
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
                System.out.println(response_model);
                return response_model;
            }

            @Override
            public String setFounds(int tkn, double amount) throws RemoteException {
                String response_model="";
                List<Cuentas>cuentas = new ArrayList<Cuentas>();
                List<Cocobanco>banco = new ArrayList<Cocobanco>();
                try{
                    Query query = Em.get().createQuery("SELECT c FROM cuentas c WHERE c.ID_UsuarioGift.ID_UsuarioGift=:token");
                    query.setParameter("token", tkn);
                    cuentas = query.getResultList();
                    if(cuentas.size()>0){
                       int id_cocobanco = cuentas.get(0).getIDCuenta();
                       query = Em.get().createQuery("UPDATE cocobanco c SET c.Saldo= :saldo WHERE c.ID_Cuenta= :id_cuenta");
                       int update=query.setParameter("saldo", amount).setParameter("id_cuenta", tkn).executeUpdate();
                       if(update>=1){
                           response_model="Saldo actualizado";
                       }
                       else{
                           response_model="Imposible actualizar saldo";
                       }
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
