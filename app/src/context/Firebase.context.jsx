import { app, db } from "../services/firebaseConfig";
import { collection, getDocs, query, where, doc, getDoc, updateDoc, addDoc, orderBy, deleteDoc } from "firebase/firestore";
import React, {createContext, useContext, useEffect, useState} from 'react';

const FirebaseContext = createContext({})
FirebaseContext.displayName = 'FirebaseContext';

const FirebaseProvider = ({children}) => {

    const customersCol = collection(db, 'Customers');

    async function getCustomers() {
        try {
            console.log(customersCol);
            const customerSnapshot = await getDocs(customersCol);
            const customersList = customerSnapshot.docs.map(doc => doc.data());
            return customersList;
        } catch (error) {
            console.error('Erro ao obter clientes:', error);
            throw error;
        }
    }

    async function setCustomer(user) {
        try {
            return await addDoc(customersCol, user)
        } catch (error) {
            console.error('Erro ao cadastrar clientes:', error);
            throw error;
        }
    }

    async function updateCustomer() {
        try {

        } catch (error) {
            console.error('Erro ao cadastrar clientes:', error);
            throw error;
        }
    }

    async function deleteCustomer(customerIds) {
        try {
            for (let i = 0; i < customerIds.length; i++) {
                const customerId = customerIds[i];
                const q = query(collection(db, 'Customers'), where('id', '==', customerId)); // Consulta para encontrar documentos com o ID correspondente
                const querySnapshot = await getDocs(q);
                
                querySnapshot.forEach(async (doc) => {
                  await deleteDoc(doc.ref);
                  console.log(`Cliente com ID ${customerId} excluído com sucesso.`);
                });
            }
            
        } catch (error) {
            console.error('Erro ao cadastrar clientes:', error);
            throw error;
        }
    }

    return (
        <FirebaseContext.Provider value={{
          getCustomers,
          setCustomer,
          updateCustomer,
          deleteCustomer
            }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export const useFirebase = () => {
    const context = useContext(FirebaseContext)
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider')
    }
    return context
}

export {FirebaseContext, FirebaseProvider}