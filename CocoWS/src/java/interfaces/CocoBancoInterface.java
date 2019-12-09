/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package interfaces;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 *
 * @author isaac
 */
public interface CocoBancoInterface extends Remote{
    String createAccount(final String NewAccountModel) throws RemoteException;
    String updateAmount(final int userTkn, final double amount) throws RemoteException;
    String deleteAccount(final int userTkn) throws RemoteException;
    String getAccounts() throws RemoteException; 
}
