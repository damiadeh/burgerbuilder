import React from 'react';

import Aux from '../Base';
// import Button from '../UI/Button/Button';
import './Button.css';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>);
            
    });
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Your delicious burger has the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <button className="Button Danger" onClick={props.canceled}>CANCEL</button>
            <button className="Button Success" onClick={props.continued}>CONTINUE</button>
        </Aux>
    )
};

export default orderSummary;