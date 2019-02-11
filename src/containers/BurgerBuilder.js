import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../components/Base';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';
import Modal from '../components/Modal/Modal';
// import '../components/Burger/Button.css';
import OrderSummary from '../components/Burger/OrderSummary';
import axios from '../axios-base';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../helpers/withErrorHandler';
import * as burgerBuilderActions from '../store/actions/index';


class BurgerBuilder extends Component{
    state = {
        
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

    componentDidMount (){
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el ) => {
                return sum + el;
            }, 0);
            return sum > 0;
    }
    //sum is sum of all ingredients
    //el is individual element
    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice,     //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if(oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceSubtraction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceSubtraction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => { 
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        

        let burger = this.props.error ? <p>ingredients cn't be loaded</p> : <Spinner />;

        if (this.props.ings){
            burger =(
                <Aux>
                    <Burger ingredient={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.tPrice}
                        ordered={this.purchaseHandler}
                        purchasable = {this.updatePurchaseState(this.props.ings)} />
                </Aux>
            );
            orderSummary = <OrderSummary  
            ingredients={this.props.ings}
            canceled={this.purchaseCancelHandler}
            continued={this.purchaseContinueHandler}
            price={this.props.tPrice} />;
        }

        // const ingredientSummary = Object.keys(this.state.ingredients).map(igKey => {
        //     return (
        //         <li key={igKey}>
        //             <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.state.ingredients[igKey]}
        //         </li>);
                
        // })

        

        // if (this.state.loading){
        //     orderSummary = <Spinner />;
        // }
        //out come {sald: true, meat:false, ...}
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        tPrice: state.totalPrice,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        //onIngredientAdded: choice name
        //type is what you have in your reducer ingredientNmae also
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));