import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';

import { RulesetsReducer } from './reducers/rulesetsReducer';
import { CashbacksReducer } from './reducers/cashbacksReducer';
import { TransactionsReducer } from './reducers/transactionsReducer';
import { RulesetsAction } from './actions/rulesetsActions';
import { CashbacksAction } from './actions/cashbacksActions';
import { TransactionsAction } from './actions/transactionsActions';
import { RulesetState } from "./models/rulesets";
import { CashbackState } from "./models/cashbacks";
import { TransactionState } from "./models/transaction";

export interface RootState {
    readonly rulesets: RulesetState;
    readonly cashbacks: CashbackState;
    readonly transactions: TransactionState;
}

const rootReducer = combineReducers<RootState>({
    rulesets: RulesetsReducer,
    cashbacks: CashbacksReducer,
    transactions: TransactionsReducer
});

export type RootActions = RulesetsAction;
export type CashbackActions = CashbacksAction;
export type TransactionActions = TransactionsAction;

export const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions, CashbackActions>)
);
