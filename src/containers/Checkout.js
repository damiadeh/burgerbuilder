import React, {Component} from 'react';
import CheckoutSummary from '../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../containers/ContactData';
import {connect} from 'react-redux';
//import * as actions from '../store/actions/index';

class Checkout extends Component {


    CheckoutCancelledHandler= () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler= () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    CheckoutCancelled={this.CheckoutCancelledHandler}
                    CheckoutContinued={this.CheckoutContinuedHandler} />
           
                    <Route 
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
                </div>
            );    
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        tPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);