import _ from 'lodash';
import { CashbacksAction, CashbacksActionTypes } from '../actions/cashbacksActions';
import { Reducer } from 'redux';

import { CashbackState } from '../models/cashbacks';

export const initialState = {
    items: {},
    loading: false,
    error: null
};

export const CashbacksReducer: Reducer<CashbackState, CashbacksAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case CashbacksActionTypes.FETCH_CASHBACKS:
        case CashbacksActionTypes.FETCH_CASHBACKS_FAIL:
        case CashbacksActionTypes.FETCH_CASHBACKS_SUCCESS:
            console.log('Cashback State from reducer: ', { ...state.items, ..._.mapKeys(action.payload, '_id') });
            return {
                ...state,
                items: { ...state.items, ..._.mapKeys(action.payload, '_id') },
                loading: false
            };
        default:
            return state;
    }
};