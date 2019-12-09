package Entities;

import Entities.Producto;
import Entities.Usuario;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-12-09T01:40:00")
@StaticMetamodel(Compra.class)
public class Compra_ { 

    public static volatile SingularAttribute<Compra, Integer> idCompra;
    public static volatile SingularAttribute<Compra, Usuario> idUsuario;
    public static volatile SingularAttribute<Compra, Integer> cantidad;
    public static volatile SingularAttribute<Compra, Producto> idProducto;

}