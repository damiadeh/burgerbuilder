import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        { props.isAuthenticated ? 
        <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Authenticate</NavigationItem> }
    </ul>
);

export default navigationItems;