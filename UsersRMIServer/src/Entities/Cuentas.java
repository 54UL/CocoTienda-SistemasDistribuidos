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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author David
 */
@Entity
@Table(name = "cuentas")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Cuentas.findAll", query = "SELECT c FROM Cuentas c")
    , @NamedQuery(name = "Cuentas.findByIDCuentas", query = "SELECT c FROM Cuentas c WHERE c.iDCuentas = :iDCuentas")
    , @NamedQuery(name = "Cuentas.findByIDCuenta", query = "SELECT c FROM Cuentas c WHERE c.iDCuenta = :iDCuenta")})
public class Cuentas implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID_Cuentas")
    private Integer iDCuentas;
    @Column(name = "ID_Cuenta")
    private Integer iDCuenta;
    @JoinColumn(name = "ID_UsuarioGift", referencedColumnName = "id_usuario")
    @ManyToOne
    private Usuario iDUsuarioGift;

    public Cuentas() {
    }

    public Cuentas(Integer iDCuentas) {
        this.iDCuentas = iDCuentas;
    }

    public Integer getIDCuentas() {
        return iDCuentas;
    }

    public void setIDCuentas(Integer iDCuentas) {
        this.iDCuentas = iDCuentas;
    }

    public Integer getIDCuenta() {
        return iDCuenta;
    }

    public void setIDCuenta(Integer iDCuenta) {
        this.iDCuenta = iDCuenta;
    }

    public Usuario getIDUsuarioGift() {
        return iDUsuarioGift;
    }

    public void setIDUsuarioGift(Usuario iDUsuarioGift) {
        this.iDUsuarioGift = iDUsuarioGift;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (iDCuentas != null ? iDCuentas.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Cuentas)) {
            return false;
        }
        Cuentas other = (Cuentas) object;
        if ((this.iDCuentas == null && other.iDCuentas != null) || (this.iDCuentas != null && !this.iDCuentas.equals(other.iDCuentas))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "interfaces.Cuentas[ iDCuentas=" + iDCuentas + " ]";
    }
    
}
