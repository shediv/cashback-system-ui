import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <div>
        <h5 className="title">Cashback System</h5>
        <ul>
            <li><Link to="/">Cashback</Link></li>
            <li><Link to="/ruleset">Ruleset</Link></li>
            <li><Link to="/transaction">Transaction</Link></li>            
        </ul>
      <hr />
    </div>
  );
};

export default HeaderComponent;