import React, {Component} from 'react';
import CheckoutSummary from '../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {}
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()){
            //['salad', '1]//the plus added coverts it to a number
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

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
                    ingredients={this.state.ingredients}
                    CheckoutCancelled={this.CheckoutCancelledHandler}
                    CheckoutContinued={this.CheckoutContinuedHandler} />
            </div>
        );
    }
}

export default Checkout;