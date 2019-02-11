import React, {Component} from 'react';
import CheckoutSummary from '../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../containers/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

    CheckoutCancelledHandler= () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler= () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    CheckoutCancelled={this.CheckoutCancelledHandler}
                    CheckoutContinued={this.CheckoutContinuedHandler} />
                    {/* instead of using component we use render to be able to pass the ingredient data to the condata data page //render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.totalPrice} {...props} */}
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        tPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);