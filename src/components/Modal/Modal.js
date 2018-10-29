import React from 'react';

import './Modal.css';
import Aux from '../Base';
import Backdrop from '../UI/Backdrop/Backdrop';

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className="Modal" 
            style={{
                transform: props.show ? 'transformY(0)' : 'transformY(-100vh)', 
                display: props.show ? 'block' : 'none'
            }}>
            {props.children}
        </div>
    </Aux>
);

export default modal;