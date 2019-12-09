package Singleton;

import javax.persistence.EntityManager;
import javax.persistence.Persistence;

public class Em {
    private static EntityManager em;      
    private Em(){}
    
    static public EntityManager get(){
        if(em == null)         
            em = Persistence.createEntityManagerFactory("ProductsRMIServerPU").createEntityManager();               
        return em;               
    }
}