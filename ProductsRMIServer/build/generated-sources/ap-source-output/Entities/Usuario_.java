package Entities;

import Entities.Compra;
import Entities.Cuentas;
import Entities.TipoUsuario;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-12-09T01:40:00")
@StaticMetamodel(Usuario.class)
public class Usuario_ { 

    public static volatile CollectionAttribute<Usuario, Cuentas> cuentasCollection;
    public static volatile CollectionAttribute<Usuario, Compra> compraCollection;
    public static volatile SingularAttribute<Usuario, Integer> idUsuario;
    public static volatile SingularAttribute<Usuario, String> correo;
    public static volatile SingularAttribute<Usuario, String> contrasenia;
    public static volatile SingularAttribute<Usuario, TipoUsuario> idTipousuario;
    public static volatile SingularAttribute<Usuario, String> nombre;

}