import React from 'react';

import burgerLogo from '../../assets/img/chef-burger.jpg';
import './Logo.css';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={burgerLogo} alt="burgre logo" />
    </div>
);

export default logo;