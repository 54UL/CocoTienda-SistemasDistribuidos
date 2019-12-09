/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import interfaces.ProductInterface;
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

/**
 *
 * @author Zazir
 */
@WebService(serviceName = "ProductoWebService")
public class ProductsWS {
    private static final String IP = "192.168.84.236";
    private static final int PORT = 7070;
    private static Registry registry;
    private static ProductInterface interfaz;
    
    static
    {
        try
        {
            System.out.println("[WS] -> Constructor block!");
            registry = LocateRegistry.getRegistry(IP, PORT);
            interfaz = (ProductInterface) (UserInterface) registry.lookup("ProductsRMIServer");
            System.out.println("[WS] -> Connection set!!!!");
        } 
        catch (RemoteException | NotBoundException ex) 
        {
            Logger.getLogger(UsuariosWS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public ProductsWS() {
    }
    
    @WebMethod(operationName = "Products_OP")
    public String Products_OP(@WebParam(name="cat")int cat){
        try 
        {
            System.out.println("INSIDE WEB METHOD -> Products_OP");
            String res = interfaz.retriveProducts(cat);
            return res;
        } 
        catch (RemoteException ex)
        {
            System.out.println("EXCEPTION: " + ex.toString());
            return "Te wa matar";
        }
    }
    
    @WebMethod(operationName = "GetStock_OP")
    public String getBDStock(@WebParam(name = "productID")int productID){
        /*try {
            var stockResult = await bdApi.query("SELECT * FROM producto WHERE id_producto=" + productID);
            if (stockResult[0] != undefined) {
                  resolve({ stock: stockResult[0].cantidad });
            }
            else
                resolve({ stock: -1 })
            }
            catch (error) {
                reject(error);
        }*/
        return null;
    }
}
