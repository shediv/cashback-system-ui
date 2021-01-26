import axios from '../axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState, RootActions } from '../store';
import { AxiosResponse } from 'axios';
import { Ruleset, Rulesets } from '../models/rulesets';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;
export enum RulesetsActionTypes {
    FETCH_RULESETS = 'FETCH_RULESETS',
    FETCH_RULESETS_SUCCESS = 'FETCH_RULESETS_SUCCESS',
    FETCH_RULESETS_FAIL = 'FETCH_RULESETS_FAIL',

    ADD_RULESET = 'ADD_RULESET',
    ADD_RULESET_SUCCESS = 'ADD_RULESET_SUCCESS',
    ADD_RULESET_FAIL = 'ADD_RULESET_FAIL',

    EDIT_RULESET = 'EDIT_RULESET',
    EDIT_RULESET_SUCCESS = 'EDIT_RULESET_SUCCESS',
    EDIT_RULESET_FAIL = 'EDIT_RULESET_FAIL',

    DELETE_RULESET = 'DELETE_RULESET',
    DELETE_RULESET_SUCCESS = 'DELETE_RULESET_SUCCESS',
    DELETE_RULESET_FAIL = 'DELETE_RULESET_FAIL'
}


// Fetch Rulesets
interface FetchRulesets {
    type: RulesetsActionTypes.FETCH_RULESETS;
}

interface FetchRulesetsSuccess {
    type: RulesetsActionTypes.FETCH_RULESETS_SUCCESS;
    payload: Rulesets;
}

interface FetchRulesetsFail {
    type: RulesetsActionTypes.FETCH_RULESETS_FAIL;
}

export const fetchRulesets = (): ThunkResult<void> => async dispatch => {
    handleFetchRulesets(dispatch);
    try {
        const response: AxiosResponse<Ruleset[]> = await axios.get('/ruleset');
        handleFetchRulesetsSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchRulesetsFail(dispatch);
    }
};

export const handleFetchRulesetsSuccess = (
    dispatch: Dispatch<FetchRulesetsSuccess>,
    response: any
) => {
    dispatch({
        type: RulesetsActionTypes.FETCH_RULESETS_SUCCESS,
        payload: response
    });
};

export const handleFetchRulesetsFail = (dispatch: Dispatch<FetchRulesetsFail>) => {
    dispatch({
        type: RulesetsActionTypes.FETCH_RULESETS_FAIL
    });
};

export const handleFetchRulesets = (dispatch: Dispatch<FetchRulesets>) => {
    dispatch({ type: RulesetsActionTypes.FETCH_RULESETS });
}

// Add Rulesets
interface AddRuleset {
    type: RulesetsActionTypes.ADD_RULESET;
}

interface AddRulesetsuccess {
    type: RulesetsActionTypes.ADD_RULESET_SUCCESS;
    payload: Ruleset;
}

interface AddRulesetFail {
    type: RulesetsActionTypes.ADD_RULESET_FAIL;
}

export const addRuleset = (Ruleset: Ruleset): ThunkResult<void> => async dispatch => {
    console.log('Ruleset in addRuleset in Actions: ', Ruleset);
    handleAddRuleset(dispatch);
    try {
        const response: AxiosResponse<Ruleset> = await axios.post('/ruleset', Ruleset);
        handleAddRulesetsuccess(dispatch, response.data);
        console.log('handleAddRulesetsuccess in Actions: ', response);        
    } catch (e) {
        handleAddRulesetFail(dispatch);
    }
};

const handleAddRuleset = (dispatch: Dispatch<AddRuleset>) => {
    dispatch({ type: RulesetsActionTypes.ADD_RULESET });
};

const handleAddRulesetsuccess = (
    dispatch: Dispatch<AddRulesetsuccess>,
    response: Ruleset
) => {
    console.log('handleAddRulesetsuccess response in Actions: ', response);
    dispatch({ type: RulesetsActionTypes.ADD_RULESET_SUCCESS, payload: response });
};

const handleAddRulesetFail = (dispatch: Dispatch<AddRulesetFail>) => {
    dispatch({ type: RulesetsActionTypes.ADD_RULESET_FAIL });
};

// Delete Ruleset
interface DeleteRuleset {
    type: RulesetsActionTypes.DELETE_RULESET;
}

interface DeleteRulesetsuccess {
    type: RulesetsActionTypes.DELETE_RULESET_SUCCESS;
    payload: number;
}

interface DeleteRulesetFail {
    type: RulesetsActionTypes.DELETE_RULESET_FAIL;
}

export const deleteRuleset = (deletedRulesetId: number): ThunkResult<void> => async dispatch => {
    dispatch({ type: RulesetsActionTypes.DELETE_RULESET });
    try {
        await axios.put(`/ruleset/delete/${deletedRulesetId}`);
        dispatch({
            type: RulesetsActionTypes.DELETE_RULESET_SUCCESS,
            payload: deletedRulesetId
        });
    } catch (e) {
        dispatch({ type: RulesetsActionTypes.DELETE_RULESET_FAIL });
    }
};

export type RulesetsAction =
    | FetchRulesets
    | FetchRulesetsFail
    | FetchRulesetsSuccess
    | AddRuleset
    | AddRulesetFail
    | AddRulesetsuccess
    | DeleteRuleset
    | DeleteRulesetsuccess
    | DeleteRulesetFail;