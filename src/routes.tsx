import React from 'react';
import RulesetComponent from './containers/ruleset';
import CashbackComponent from './containers/cashback';
import TransactionComponent from './containers/transaction';
import HeaderComponent from './containers/header';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <HeaderComponent />
      <Switch>
        <Route exact path="/" component={CashbackComponent} />
        <Route exact path="/transaction" component={TransactionComponent} />
        <Route exact path="/ruleset" component={RulesetComponent} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};