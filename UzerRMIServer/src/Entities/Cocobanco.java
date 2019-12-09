/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author jorge
 */
@Entity
@Table(name = "cocobanco")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Cocobanco.findAll", query = "SELECT c FROM Cocobanco c")
    , @NamedQuery(name = "Cocobanco.findByIDCuenta", query = "SELECT c FROM Cocobanco c WHERE c.iDCuenta = :iDCuenta")
    , @NamedQuery(name = "Cocobanco.findBySaldo", query = "SELECT c FROM Cocobanco c WHERE c.saldo = :saldo")
    , @NamedQuery(name = "Cocobanco.findByCorreo", query = "SELECT c FROM Cocobanco c WHERE c.correo = :correo")
    , @NamedQuery(name = "Cocobanco.findByContrasenia", query = "SELECT c FROM Cocobanco c WHERE c.contrasenia = :contrasenia")})
public class Cocobanco implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID_Cuenta")
    private Integer iDCuenta;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Saldo")
    private Double saldo;
    @Column(name = "correo")
    private String correo;
    @Column(name = "contrasenia")
    private String contrasenia;

    public Cocobanco() {
    }

    public Cocobanco(Integer iDCuenta) {
        this.iDCuenta = iDCuenta;
    }

    public Integer getIDCuenta() {
        return iDCuenta;
    }

    public void setIDCuenta(Integer iDCuenta) {
        this.iDCuenta = iDCuenta;
    }

    public Double getSaldo() {
        return saldo;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (iDCuenta != null ? iDCuenta.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Cocobanco)) {
            return false;
        }
        Cocobanco other = (Cocobanco) object;
        if ((this.iDCuenta == null && other.iDCuenta != null) || (this.iDCuenta != null && !this.iDCuenta.equals(other.iDCuenta))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Entities.Cocobanco[ iDCuenta=" + iDCuenta + " ]";
    }
    
}
