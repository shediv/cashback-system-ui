import React from 'react';
import './App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import RulesetComponent from './containers/ruleset';
import CashbackComponent from './containers/cashback';
import TransactionComponent from './containers/transaction';
import HeaderComponent from './containers/header';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <HeaderComponent /> */}
      <HashRouter basename="/">
        <Switch>
          <Route path="/" exact component={CashbackComponent} />
          <Route path="/transaction" exact component={TransactionComponent} />
          <Route path="/ruleset" exact component={RulesetComponent} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
