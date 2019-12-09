package Entities;

import Entities.Usuario;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-12-09T01:40:00")
@StaticMetamodel(TipoUsuario.class)
public class TipoUsuario_ { 

    public static volatile SingularAttribute<TipoUsuario, String> tipo;
    public static volatile SingularAttribute<TipoUsuario, Integer> idTipousuario;
    public static volatile CollectionAttribute<TipoUsuario, Usuario> usuarioCollection;

}