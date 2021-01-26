import axios from '../axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState, RootActions, CashbackActions } from '../store';
import { AxiosResponse } from 'axios';
import { Cashback, Cashbacks } from '../models/cashbacks';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, CashbackActions>;
export enum CashbacksActionTypes {
    FETCH_CASHBACKS = 'FETCH_CASHBACKS',
    FETCH_CASHBACKS_SUCCESS = 'FETCH_CASHBACKS_SUCCESS',
    FETCH_CASHBACKS_FAIL = 'FETCH_CASHBACKS_FAIL',
}


// Fetch Rulesets
interface FetchCashbacks {
    type: CashbacksActionTypes.FETCH_CASHBACKS;
}

interface FetchCashbacksSuccess {
    type: CashbacksActionTypes.FETCH_CASHBACKS_SUCCESS;
    payload: Cashbacks;
}

interface FetchCashbacksFail {
    type: CashbacksActionTypes.FETCH_CASHBACKS_FAIL;
}

export const fetchCashbacks = (): ThunkResult<void> => async dispatch => {
    handleFetchCashbacks(dispatch);
    try {
        const response: AxiosResponse<Cashback[]> = await axios.get('/cashback');
        handleFetchCashbacksSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchCashbacksFail(dispatch);
    }
};

export const handleFetchCashbacksSuccess = (
    dispatch: Dispatch<FetchCashbacksSuccess>,
    response: any
) => {
    dispatch({
        type: CashbacksActionTypes.FETCH_CASHBACKS_SUCCESS,
        payload: response
    });
};

export const handleFetchCashbacksFail = (dispatch: Dispatch<FetchCashbacksFail>) => {
    dispatch({
        type: CashbacksActionTypes.FETCH_CASHBACKS_FAIL
    });
};

export const handleFetchCashbacks = (dispatch: Dispatch<FetchCashbacks>) => {
    dispatch({ type: CashbacksActionTypes.FETCH_CASHBACKS });
}

export type CashbacksAction =
    | FetchCashbacks
    | FetchCashbacksFail
    | FetchCashbacksSuccess