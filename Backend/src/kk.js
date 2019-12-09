import { updateStock } from "./Products";

List<Products> listaproductos = new ArrayList();

//Strings
String queryHis = "SELECT producto.imagen, producto.nombre, producto.id_producto, producto.precio_unitario, compra.cantidad from compra inner join usuario on usuario.id_usuario = compra.id_usuario inner join producto on producto.id_producto = compra.id_producto where compra.id_usuario = :usrTkn;";

//QUERY IF
String queryx = "SELECT * from Producto  where id_categoria  = :cat;";
////////

//InsertProductos
String queryInsert = "INSERT INTO producto(id_producto, nombre, id_categoria, cantidad, precio_unitario, imagen) VALUES (0, :name, :category, :stock, :price, :imageFolderPath)";
/////////

//JalarProductos
String queryProductos = "SELECT * FROM producto WHERE id_producto = :productID;";

//QUERYHISTORY
Query queryGetHistory = Em.get().createQuery(queryHis);
queryGetHistory.setParameter("usrTkn", usrTkn);

listaproductos = queryGetHistory.getResultList();

//QUERY IF
Query queryIf = Em.get().createQuery(queryx);
queryIf.setParameter("cat", Cat);

//InsertProductos
Query queryInsert = Em.createQuery(queryInsertProductos)
.setParameter("name", Name)
.setParameter("category", Category)
.setParameter("stock", Stock)
.setParameter("price", Price)
.setParameter("imageFolderPath", Image);

String res = queryInsert.executeUpdate();

//JalarProductos
Query queryProducts = Em.createQuery(queryProductos)
.setParameter("productID", IDProduct);

//UpdateProductos
String updateStock = "UPDATE producto SET cantidad = :stockValue WHERE id_producto= :productID;";

Query updateStatus = Em.createQuery(updateStock)
.setParameter("stockValue", Stock)
.setParameter("productID", IDProduct);

String res = updateStatus.executeUpdate();

//InsertCompra
String insertBuyQuery = "INSERT INTO compra (id_compra,id_usuario,id_producto,cantidad) values (0, :usrToken, :id_producto, :quantity)";

Query buyQuery = Em.createQuery(insertBuyQuery)
.setParameter("usrToken", usrTkn)
.setParameter("id_producto", IDProducto)
.setParameter("quantity", quantity);

String res = buyQuery.executeUpdate();