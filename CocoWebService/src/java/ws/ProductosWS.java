package ws;

import interfaces.ProductInterface;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;

@WebService(serviceName = "ProductosWS")
public class ProductosWS {

    private static final String IP = "192.168..82";
    private static final int PORT = 7070;
    private static Registry registry;
    private static ProductInterface interfaz;
    
    static
    {
        try {
            System.out.println("[WS] -> Constructor block!");
            registry = LocateRegistry.getRegistry(IP, PORT);
            interfaz = (ProductInterface) registry.lookup("UserRMIServer");
            System.out.println("[WS] -> Connection set!!!!");

        } catch (RemoteException | NotBoundException ex) {
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public ProductosWS() {
    }
    
    @WebMethod(operationName = "hello")
    public String hello(@WebParam(name = "name") String txt) {
        return "Hello " + txt + " !";
    }
    
    @WebMethod(operationName = "getProducts")
    public String getAllProducts(@WebParam(name = "Token") String usrTkn){
        
        
        /*Query queryGetHistory = Em.get().createQuery(queryHis);
        queryGetHistory.setParameter("usrTkn", usrTkn);

        listaproductos = queryGetHistory.getResultList();*/
        return null;
    }
}
