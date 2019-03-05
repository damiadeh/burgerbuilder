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
import * as actions from '../store/actions/index';


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
  

    purchaseHandler = () => { 
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
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
        ings: state.burgerBuilder.ingredients,
        tPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        //onIngredientAdded: choice name
        //type is what you have in your reducer ingredientNmae also
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));