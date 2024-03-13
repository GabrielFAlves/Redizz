import { app, db } from "../services/firebaseConfig";
import { collection, getDocs, query, where, doc, getDoc, updateDoc, addDoc, orderBy, deleteDoc } from "firebase/firestore";
import React, {createContext, useContext, useEffect, useState} from 'react';

const FirebaseContext = createContext({})
FirebaseContext.displayName = 'FirebaseContext';

const FirebaseProvider = ({children}) => {
    async function getCustomers() {
        try {
            const customersCol = collection(db, 'Customers');
            console.log(customersCol);
            const customerSnapshot = await getDocs(customersCol);
            const customersList = customerSnapshot.docs.map(doc => doc.data());
            return customersList;
        } catch (error) {
            console.error('Erro ao obter clientes:', error);
            throw error;
        }
    }

    return (
        <FirebaseContext.Provider value={{
          getCustomers
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