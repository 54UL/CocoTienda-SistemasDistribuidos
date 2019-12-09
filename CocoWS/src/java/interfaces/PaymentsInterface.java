/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package interfaces;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface PaymentsInterface extends Remote
{
    String authTransaction(final int orgTkn, final int dest, final double amount) throws RemoteException;
    String getFounds(final int userTkn) throws RemoteException;
    String setFounds(final int tkn, final double amount) throws RemoteException;
    
}