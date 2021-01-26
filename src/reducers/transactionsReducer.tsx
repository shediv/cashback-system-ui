import _ from 'lodash';
import { TransactionsAction, TransactionsActionTypes } from '../actions/transactionsActions';
import { Reducer } from 'redux';

import { TransactionState } from '../models/transaction';

export const initialState = {
    items: {},
    loading: false,
    error: null
};

export const TransactionsReducer: Reducer<TransactionState, TransactionsAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case TransactionsActionTypes.FETCH_TRANSACTIONS:
        case TransactionsActionTypes.ADD_TRANSACTION:
        case TransactionsActionTypes.FETCH_TRANSACTIONS_FAIL:
        case TransactionsActionTypes.ADD_TRANSACTION_FAIL:
            return { ...state, loading: false };

        case TransactionsActionTypes.ADD_TRANSACTION_SUCCESS:
            const { _id } = action.payload;
            return {
                ...state,
                items: { ...state.items, [_id]: action.payload },
                loading: false
            };

        case TransactionsActionTypes.FETCH_TRANSACTIONS_SUCCESS:
            console.log('State from reducer: ', { ...state.items, ..._.mapKeys(action.payload, '_id') });
            return {
                ...state,
                items: { ...state.items, ..._.mapKeys(action.payload, '_id') },
                loading: false
            };

        case TransactionsActionTypes.DELETE_TRANSACTION_SUCCESS:
            return {
                ...state,
                items: { ..._.omit(state.items, action.payload) }
            };

        default:
            return state;
    }
};