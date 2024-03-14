import { app, db } from "../services/firebaseConfig";
import { collection, getDocs, query, where, doc, getDoc, updateDoc, addDoc, orderBy, deleteDoc } from "firebase/firestore";
import React, {createContext, useContext, useEffect, useState} from 'react';

const FirebaseContext = createContext({})
FirebaseContext.displayName = 'FirebaseContext';

const FirebaseProvider = ({children}) => {

    const customersCol = collection(db, 'Customers');
    const productsCol = collection(db, 'Products');
    const salesCol = collection(db, 'Sales');

    async function getCustomers() {
        try {
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

    async function getProducts() {
        try {
            const productSnapshot = await getDocs(productsCol);
        const productsList = productSnapshot.docs.map(doc => doc.data());
            return productsList;
        } catch {
            console.error('Erro ao obter os produtos:', error);
            throw error;
        }
    }

    async function setProduct(product) {
        try {
            return await addDoc(productsCol, product)
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            throw error;
        }
    }

    async function updateProduct() {
        try {

        } catch (error) {
            console.error('Erro ao cadastrar clientes:', error);
            throw error;
        }
    }

    async function deleteProduct(productIds) {
        try {
            for (let i = 0; i < productIds.length; i++) {
                const productId = productIds[i];
                const q = query(collection(db, 'Products'), where('id', '==', productId)); // Consulta para encontrar documentos com o ID correspondente
                const querySnapshot = await getDocs(q);
                
                querySnapshot.forEach(async (doc) => {
                  await deleteDoc(doc.ref);
                  console.log(`Produto com ID ${productId} excluído com sucesso.`);
                });
            }
            
        } catch (error) {
            console.error('Erro ao deletar produtos', error);
            throw error;
        }
    }

    async function getSales() {
        try {
            const saleSnapshot = await getDocs(salesCol);
        const salesList = saleSnapshot.docs.map(doc => doc.data());
            return salesList;
        } catch {
            console.error('Erro ao obter as vendas:', error);
            throw error;
        }
    }

    async function setSale(sale) {
        try {
            return await addDoc(salesCol, sale)
        } catch (error) {
            console.error('Erro ao cadastrar venda:', error);
            throw error;
        }
    }

    async function updateSale() {
        try {

        } catch (error) {
            console.error('Erro ao cadastrar clientes:', error);
            throw error;
        }
    }

    async function deleteSale(saleIds) {
        try {
            for (let i = 0; i < saleIds.length; i++) {
                const saleId = saleIds[i];
                const q = query(collection(db, 'Sales'), where('id', '==', saleId)); // Consulta para encontrar documentos com o ID correspondente
                const querySnapshot = await getDocs(q);
                
                querySnapshot.forEach(async (doc) => {
                  await deleteDoc(doc.ref);
                  console.log(`Venda com ID ${saleId} excluída com sucesso.`);
                });
            }
            
        } catch (error) {
            console.error('Erro ao deletar vendas:', error);
            throw error;
        }
    }

    return (
        <FirebaseContext.Provider value={{
          getCustomers,
          setCustomer,
          updateCustomer,
          deleteCustomer,
          getProducts,
          setProduct,
          updateProduct,
          deleteProduct,
          getSales,
          setSale,
          updateSale,
          deleteSale
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