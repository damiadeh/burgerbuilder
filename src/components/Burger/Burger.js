import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient';

const burger = (props) => {
    let tIngredients = Object.keys(props.ingredient).map(igKey => {
        return [...Array(props.ingredient[igKey])].map((_, i) =>{
           return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    //check if the array is empty
    if(tIngredients.length === 0) {
        tIngredients = <p>Please start adding ingredients</p>;
    } 
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {tIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;


