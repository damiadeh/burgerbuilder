import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 400,
    error: false,
    building: false
};

const INGREDIENT_PRICES  = {
    salad : 100,
    cheese: 100,
    meat: 250,
    bacon: 150,
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.ADD_INGREDIENTS): return addIngredient(state, action);
        case (actionTypes.REMOVE_INGREDIENTS):
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            //     },
            //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            // };
            const updatedIngredient2 = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1}
            const updatedIngredients2 = updateObject(state.ingredients, updatedIngredient2);
            const updatedState2 = {
                ingredients: updatedIngredients2,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState2);
        case (actionTypes.SET_INGREDIENTS):
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 400,
                error: false,
                building:false
            });
        case (actionTypes.FETCH_INGREDIENTS_FAILED):
            return updateObject(state, {error: true} );
        default:
            return state;
    }
};

export default reducer;