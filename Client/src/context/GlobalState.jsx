import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true
};

//create context
export const GlobalContext = createContext(initialState);
// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions 
  async function getTransaction() {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/transactions');
      dispatch({
        type: 'GET_TRANSACTION',
        payload: res.data.data
      })

    } catch (error) {
      dispatch({
        type: ' TRANSACTION_error',
        payload: error.response.data.error
      })

    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`http://localhost:5000/api/v1/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      })
    //  getTransaction();
    } catch (error) {
      dispatch({
        type: ' TRANSACTION_error',
        payload: error.response.data.error
      })
    }

  }
  async function AddTransaction(transaction) {
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    try {
      await axios.post('http://localhost:5000/api/v1/transactions', transaction,config);
      getTransaction();

    } catch (error) {
      dispatch({
        type: ' TRANSACTION_error',
        payload: error
      })
    }

  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      getTransaction,
      deleteTransaction,
      AddTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
