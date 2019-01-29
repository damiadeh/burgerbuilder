import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return(
        <div className="CheckoutSummary">
            <h1>Our delicacy is just the best</h1>
            <div style={{width: '100%',margin: 'auto'}}>
                <Burger ingredient={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.CheckoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.CheckoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary