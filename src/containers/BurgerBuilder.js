import React, { Component } from 'react';
import Aux from '../components/Base';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';
import Modal from '../components/Modal/Modal';
// import '../components/Burger/Button.css';
import OrderSummary from '../components/Burger/OrderSummary';

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
        purchasing: false
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
        alert("Payment Page!!");
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
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
                    {/* <h3>Your Order</h3>
                    <p>Your delicious burger has the following ingredients:</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <button className="Button Danger" onClick={this.purchaseCancelHandler}>CANCEL</button>
                    <button className="Button Success" onClick={this.purchaseContinueHandler}>CONTINUE</button> */}
                    {/* <p>Continue to checkout</p> */}
                    
                    <OrderSummary  
                        ingredients={this.state.ingredients}
                        canceled={this.purchaseCancelHandler}
                        continued={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
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