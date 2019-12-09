/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Singleton;

import javax.persistence.EntityManager;
import javax.persistence.Persistence;

public class Em {
    private static EntityManager em;      
    private Em(){}
    
    static public EntityManager get(){
        if(em == null)         
            em = Persistence.createEntityManagerFactory("USERSRMIPU").createEntityManager();               
        return em;               
    }
}