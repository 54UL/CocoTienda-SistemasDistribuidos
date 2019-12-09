/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cocobancormiserver;

import Entities.Cocobanco;
import Singleton.Em;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import interfaces.CocoBancoInterface;
import java.rmi.AlreadyBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Query;
import org.json.JSONObject;

/**
 *
 * @author David
 */
public class CocoBancoRMIServer {
     private static final int PORT = 9970;

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args)throws RemoteException, AlreadyBoundException {
        System.setProperty("java.rmi.server.hostname", "192.168.43.243");
        
        Remote remote = UnicastRemoteObject.exportObject(new CocoBancoInterface(){

            @Override
            public String createAccount(String NewAccountModel) throws RemoteException {
                JSONObject json = new JSONObject(NewAccountModel);
                double amount = json.getDouble("saldo");
                String email = json.getString("email");
                String password = json.getString("pass");
                String error = "";
                String response_model="";
                boolean flagError = false;
                
                if(amount == 0){
                    error +="No se puede crear una cuenta con saldo 0";
                    flagError=true;
                }
                if(email == ""){
                    error +="\n No se permite email vacio";
                    flagError=true;
                }
                if(password== ""){
                    error +="\n No se permite pass vacio";
                    flagError=true;
                }
                if(flagError){
                    response_model="{\"asignedToken\":0,\"msg\":\""+error+"\"}";
                }
                else{
                    Query query = Em.get().createQuery("INSERT INTO Cocobanco c VALUES(0,"+amount+", '"+email+"','"+password+"')");
                    query.executeUpdate();
                    List<Cocobanco>coco = new ArrayList<Cocobanco>();
                   
                    int token;
                    query = Em.get().createQuery("Select max(c.iDCuenta) as iDCuenta FROM Cocobanco c");
                    coco = query.getResultList();
                    token = coco.get(0).getIDCuenta();
                    response_model="{\"asignedToken\":"+token+",\"msg\":\"Cuenta creada\"}";                    
                }
                return response_model;
            }

            @Override
            public String updateAmount(int userTkn, double amount) throws RemoteException {
                String response_model;
                Cocobanco cocobanco = Em.get().find(Cocobanco.class, userTkn);
                Em.get().getTransaction().begin();
                cocobanco.setSaldo(amount);
                Em.get().getTransaction().commit();
                response_model="{\"msg\":\"Cuenta actualizada\",\"result\":\"1\"}";
                return response_model;
            }

            @Override
            public String deleteAccount(int userTkn) throws RemoteException {
                String response_model;
                Cocobanco coco = Em.get().find(Cocobanco.class, userTkn);
                Em.get().getTransaction().begin();
                Em.get().remove(coco);
                Em.get().getTransaction().commit();
                response_model="{\"msg\":\"Cuenta eliminada\",\"result\":\"1\"}";
                return response_model;
            }

            @Override
            public String getAccounts() throws RemoteException {
                String response_model;
                List<Cocobanco>banco = new ArrayList<Cocobanco>();
                Query query = Em.get().createQuery("SELECT c From Cocobanco c");
                banco = query.getResultList();
                response_model = new Gson().toJson(banco);
                return response_model;
            }
        
        },0);
        Registry registry = LocateRegistry.createRegistry(PORT);
       	System.out.println("[Payments RMI Server] -> Listening on: " + String.valueOf(PORT));
        registry.bind("CocoBanco", remote); // Registrar calculadora
        
    }
    
}
