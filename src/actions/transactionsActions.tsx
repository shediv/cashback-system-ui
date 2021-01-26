import axios from '../axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState, RootActions, TransactionActions } from '../store';
import { AxiosResponse } from 'axios';
import { Transaction, Transactions } from '../models/transaction';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, TransactionActions>;
export enum TransactionsActionTypes {
    FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS',
    FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS',
    FETCH_TRANSACTIONS_FAIL = 'FETCH_TRANSACTIONS_FAIL',

    ADD_TRANSACTION = 'ADD_TRANSACTION',
    ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS',
    ADD_TRANSACTION_FAIL = 'ADD_TRANSACTION_FAIL',

    EDIT_TRANSACTION = 'EDIT_TRANSACTION',
    EDIT_TRANSACTION_SUCCESS = 'EDIT_TRANSACTION_SUCCESS',
    EDIT_TRANSACTION_FAIL = 'EDIT_TRANSACTION_FAIL',

    DELETE_TRANSACTION = 'DELETE_TRANSACTION',
    DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS',
    DELETE_TRANSACTION_FAIL = 'DELETE_TRANSACTION_FAIL'
}


// Fetch Transactions
interface FetchTransactions {
    type: TransactionsActionTypes.FETCH_TRANSACTIONS;
}

interface FetchTransactionsSuccess {
    type: TransactionsActionTypes.FETCH_TRANSACTIONS_SUCCESS;
    payload: Transactions;
}

interface FetchTransactionsFail {
    type: TransactionsActionTypes.FETCH_TRANSACTIONS_FAIL;
}

export const fetchTransactions = (): ThunkResult<void> => async dispatch => {
    handleFetchTransactions(dispatch);
    try {
        const response: AxiosResponse<Transaction[]> = await axios.get('/transaction');
        handleFetchTransactionsSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTransactionsFail(dispatch);
    }
};

export const handleFetchTransactionsSuccess = (
    dispatch: Dispatch<FetchTransactionsSuccess>,
    response: any
) => {
    dispatch({
        type: TransactionsActionTypes.FETCH_TRANSACTIONS_SUCCESS,
        payload: response
    });
};

export const handleFetchTransactionsFail = (dispatch: Dispatch<FetchTransactionsFail>) => {
    dispatch({
        type: TransactionsActionTypes.FETCH_TRANSACTIONS_FAIL
    });
};

export const handleFetchTransactions = (dispatch: Dispatch<FetchTransactions>) => {
    dispatch({ type: TransactionsActionTypes.FETCH_TRANSACTIONS });
}

// Add Transactions
interface AddTransaction {
    type: TransactionsActionTypes.ADD_TRANSACTION;
}

interface AddTransactionsuccess {
    type: TransactionsActionTypes.ADD_TRANSACTION_SUCCESS;
    payload: Transaction;
}

interface AddTransactionFail {
    type: TransactionsActionTypes.ADD_TRANSACTION_FAIL;
}

export const addTransaction = (Transaction: Transaction): ThunkResult<void> => async dispatch => {
    console.log('Transaction in addTransaction in Actions: ', Transaction);
    handleAddTransaction(dispatch);
    try {
        const response: AxiosResponse<Transaction> = await axios.post('/Transaction', Transaction);
        handleAddTransactionsuccess(dispatch, response.data);
        console.log('handleAddTransactionsuccess in Actions: ', response);        
    } catch (e) {
        handleAddTransactionFail(dispatch);
    }
};

const handleAddTransaction = (dispatch: Dispatch<AddTransaction>) => {
    dispatch({ type: TransactionsActionTypes.ADD_TRANSACTION });
};

const handleAddTransactionsuccess = (
    dispatch: Dispatch<AddTransactionsuccess>,
    response: Transaction
) => {
    console.log('handleAddTransactionsuccess response in Actions: ', response);
    dispatch({ type: TransactionsActionTypes.ADD_TRANSACTION_SUCCESS, payload: response });
};

const handleAddTransactionFail = (dispatch: Dispatch<AddTransactionFail>) => {
    dispatch({ type: TransactionsActionTypes.ADD_TRANSACTION_FAIL });
};

// Delete Transaction
interface DeleteTransaction {
    type: TransactionsActionTypes.DELETE_TRANSACTION;
}

interface DeleteTransactionsuccess {
    type: TransactionsActionTypes.DELETE_TRANSACTION_SUCCESS;
    payload: number;
}

interface DeleteTransactionFail {
    type: TransactionsActionTypes.DELETE_TRANSACTION_FAIL;
}

export const deleteTransaction = (deletedTransactionId: number): ThunkResult<void> => async dispatch => {
    dispatch({ type: TransactionsActionTypes.DELETE_TRANSACTION });
    try {
        await axios.put(`/Transaction/delete/${deletedTransactionId}`);
        dispatch({
            type: TransactionsActionTypes.DELETE_TRANSACTION_SUCCESS,
            payload: deletedTransactionId
        });
    } catch (e) {
        dispatch({ type: TransactionsActionTypes.DELETE_TRANSACTION_FAIL });
    }
};

export type TransactionsAction =
    | FetchTransactions
    | FetchTransactionsFail
    | FetchTransactionsSuccess
    | AddTransaction
    | AddTransactionFail
    | AddTransactionsuccess
    | DeleteTransaction
    | DeleteTransactionsuccess
    | DeleteTransactionFail;