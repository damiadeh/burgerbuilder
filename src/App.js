import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
class App extends Component {
  render() {
    return (
      <div>
       <Layout>
         <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
         </Switch>
       </Layout>
      </div>
    );
  }
}

export default App;
 