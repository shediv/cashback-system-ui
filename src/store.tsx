import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';

import { RulesetsReducer } from './reducers/rulesetsReducer';
import { RulesetsAction } from './actions/rulesetsActions';
import { RulesetState } from "./models/rulesets";

export interface RootState {
    readonly rulesets: RulesetState;
}

const rootReducer = combineReducers<RootState>({
    rulesets: RulesetsReducer
});

export type RootActions = RulesetsAction;

export const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
);
