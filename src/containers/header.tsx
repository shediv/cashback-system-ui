import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <div>
        <h5>Cashback System</h5>
        <nav>            
            <Link to="/">Home</Link>
            <Link to="/transaction">Transaction</Link>
            <Link to="/ruleset">Ruleset</Link>
        </nav>
      <hr />
    </div>
  );
};

export default HeaderComponent;