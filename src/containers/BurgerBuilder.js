import React, { Component } from 'react';
import Aux from '../components/Base';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';
import Modal from '../components/Modal/Modal';
// import '../components/Burger/Button.css';
import OrderSummary from '../components/Burger/OrderSummary';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../helpers/withErrorHandler';


const INGREDIENT_PRICES  = {
    salad : 100,
    cheese: 100,
    meat: 250,
    bacon: 150,
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 400,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    // modalStuff = () => {
    //     const ingredientSummary = Object.keys(this.state.ingredients).map(igKey => {
    //         return (
    //             <li key={igKey}>
    //                 <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.state.ingredients[igKey]}
    //             </li>
    //             );
                
    //     });
    // }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el ) => {
                return sum + el;
            }, 0);
            this.setState({purchasable: sum > 0});
    }
    //sum is sum of all ingredients
    //el is individual element
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () =>  { 
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        //alert("Payment Page!!");
        // this.setState({loading: true});
        //  const order = {
        //      ingredients : this.state.ingredients,
        //      price: this.state.totalPrice,
        //      customer: {
        //          name: 'Adepoju Damilare',
        //          address: {
        //              street: '13, Yaba, Lagos',
        //              country: 'Nigeria'
        //          },
        //          email: 'dami@mail.com',
        //          phone: '08012345678'
        //      },
        //      deliveryMethod: 'Ship'
        //  }
        // axios.post('/orders.json', order).then(response => {
        //     this.setState({loading: false, purchasing: false});
        // })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            //to pass the built burger data to the checkout page
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary  
        ingredients={this.state.ingredients}
        canceled={this.purchaseCancelHandler}
        continued={this.purchaseContinueHandler}
        price={this.state.totalPrice} />;
        if (this.state.loading){
            orderSummary = <Spinner />;
        }

        // const ingredientSummary = Object.keys(this.state.ingredients).map(igKey => {
        //     return (
        //         <li key={igKey}>
        //             <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.state.ingredients[igKey]}
        //         </li>);
                
        // })
        //out come {sald: true, meat:false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredient={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable = {this.state.purchasable} />
            </Aux>
        );
    }
}


export default BurgerBuilder;