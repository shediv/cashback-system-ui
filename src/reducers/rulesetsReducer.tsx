import _ from 'lodash';
import { RulesetsAction, RulesetsActionTypes } from '../actions/rulesetsActions';
import { Reducer } from 'redux';

import { RulesetState } from '../models/rulesets';

export const initialState = {
    items: {},
    loading: false,
    error: null
};

export const RulesetsReducer: Reducer<RulesetState, RulesetsAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case RulesetsActionTypes.FETCH_RULESETS:
        case RulesetsActionTypes.ADD_RULESET:
        case RulesetsActionTypes.FETCH_RULESETS_FAIL:
        case RulesetsActionTypes.ADD_RULESET_FAIL:
            return { ...state, loading: false };

        case RulesetsActionTypes.ADD_RULESET_SUCCESS:
            const { _id } = action.payload;
            return {
                ...state,
                items: { ...state.items, [_id]: action.payload },
                loading: false
            };

        case RulesetsActionTypes.FETCH_RULESETS_SUCCESS:
            console.log('State from reducer: ', { ...state.items, ..._.mapKeys(action.payload, '_id') });
            return {
                ...state,
                items: { ...state.items, ..._.mapKeys(action.payload, '_id') },
                loading: false
            };

        case RulesetsActionTypes.DELETE_RULESET_SUCCESS:
            return {
                ...state,
                items: { ..._.omit(state.items, action.payload) }
            };

        default:
            return state;
    }
};