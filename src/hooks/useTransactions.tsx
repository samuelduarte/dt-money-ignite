import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';



interface TransactionsProps {
    id: number
    title: string,
    amount: number,
    category: string,
    type: string,
    createdAt: string
    
}
type TransactionInput = Omit<TransactionsProps, 'id' | 'createdAt'>;

interface TransactionProviderProps {
    children: ReactNode;
}

interface  TransactionContextData {
    transactions: TransactionsProps[];
    createTransaction: ( transaction: TransactionInput) => Promise<void>;
}


 const TransactionContext = createContext<TransactionContextData>(
    {} as TransactionContextData
);


export function TransactionsProvider({children }:TransactionProviderProps) {

    const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response =>{
                setTransactions(response.data.transactions);
            });      
        
    }, []);

   async function createTransaction(transactionInput: TransactionInput){

     const response = await api.post('/transactions', {
         ...transactionInput,
         createdAt: new Date(),
     })
     const { transaction } = response.data;

     setTransactions([
         ...transactions,
         transaction
     ])
        
    }
    return(
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}


export function useTransactions(){
    const context = useContext(TransactionContext);

    return context;
}