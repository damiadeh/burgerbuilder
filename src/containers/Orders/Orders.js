import React, {Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-base';
import withErrorHandler from '../../helpers/withErrorHandler';
//import order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import {NavLink} from 'react-router-dom';
import Link from '../../components/Navigation/NavigationItems/NavigationItem';

class Orders extends Component{
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render() {
        let orders = <Spinner />;
        if (!this.props.loading ) {
            orders = this.props.orders.map(order => (
                        <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
                    ))
        }
        
        return (
            <div> 
                <Modal show={this.props.error}>You need to log in first. <NavLink exact to="/auth">Login Here</NavLink> </Modal>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        error: state.order.error,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token, userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));