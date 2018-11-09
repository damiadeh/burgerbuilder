import React, {Component} from 'react';

import './Modal.css';
import Aux from '../Base';
import Backdrop from '../UI/Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show;
    }
    componentWillUpdate(){
        console.log('Modal updated')
    }
    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className="Modal" 
                    style={{
                        transform: this.props.show ? 'transformY(0)' : 'transformY(-100vh)', 
                        display: this.props.show ? 'block' : 'none'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
                );
    }
}

export default Modal;