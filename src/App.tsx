import React from 'react';
import './App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Ruleset from './containers/ruleset';

const App: React.FC = () => {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Switch>
          <Route path="/" exact component={Ruleset} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
