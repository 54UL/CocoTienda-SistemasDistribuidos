/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mapping;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import static jdk.nashorn.internal.runtime.Debug.id;

/**
 *
 * 
 * CREATE TABLE usuario(
	id_usuario int auto_increment,
	id_tipousuario int,
	nombre varchar(30), correo varchar(30), 
	contrasenia varchar(30), 
	primary key(id_usuario));
 * @author fer
 */
@Entity
@Table (name="usuario")
public class usuario implements Serializable {
    
    
    //se hace una relacion bidireccional many to one con la tabla de compra
    @Id
    @Column (name = "id_usuario")
    private int id_usuario;
    
    @Column (name= "id_tipousuario")
    private int id_tipousuario;
    
    @Column (name = "nombre")
    private String nombre;
    
    @Column (name = "correo")
    private String correo;
    
    @Column (name = "contrasenia")
    private String contrasenia;

    public int getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }

    public int getId_tipousuario() {
        return id_tipousuario;
    }

    public void setId_tipousuario(int id_tipousuario) {
        this.id_tipousuario = id_tipousuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }
    
    

    
    
}
