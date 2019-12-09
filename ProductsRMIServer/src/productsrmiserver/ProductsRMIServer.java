/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package productsrmiserver;

import Entities.Producto;
import Singleton.Em;
import interfaces.ProductInterface;
import interfaces.ServerCts;
import java.rmi.AlreadyBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Query;

/**
 *
 * @author David
 */
public class ProductsRMIServer implements ServerCts{
    
    //PORT
    private static final int PORT = 7070;

    //History
    private static final String queryHis = "SELECT producto.imagen, producto.nombre, producto.id_producto, producto.precio_unitario, "
                + "compra.cantidad from compra inner join usuario on usuario.id_usuario = compra.id_usuario inner join "
                + "producto on producto.id_producto = compra.id_producto where compra.id_usuario = :usrTkn;";
    
    //QUERY IF
    private static final String queryx = "SELECT * from Producto  where id_categoria  = :cat;";
    ////////

    //InsertProductos
    private static final String queryInsert = "INSERT INTO producto(id_producto, nombre, id_categoria, cantidad, precio_unitario, imagen) VALUES (0, :name, :category, :stock, :price, :imageFolderPath)";
    /////////

    //JalarProductos
    private static final String queryProductos = "SELECT * FROM producto WHERE id_producto = :productID;";
    
    //UpdateProductos
    String updateStock = "UPDATE producto SET cantidad = :stockValue WHERE id_producto= :productID;";

    //InsertCompra
    String insertBuyQuery = "INSERT INTO compra (id_compra,id_usuario,id_producto,cantidad) values (0, :usrToken, :id_producto, :quantity)";
    
    private static List<Producto> listaproductos = new ArrayList();
    
    public static void main(String[] args) throws RemoteException, AlreadyBoundException {
        System.setProperty("java.rmi.server.hostname", "192.168.1.82");
        
        Remote remote = UnicastRemoteObject.exportObject(new ProductInterface(){
            
            @Override
            public String History(int usrTkn) throws RemoteException{
                Query queryGetHistory = Em.get().createQuery(queryHis)
                .setParameter("usrTkn", usrTkn);

                listaproductos = queryGetHistory.getResultList();
                return null;
            }
            
        },0);
        
    }
    
}
