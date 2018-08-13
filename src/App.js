import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
// import './App.css';
import Quotation from './scenes/Quotation/Quotation';
import Login from './scenes/Login/Login';

class App extends Component {
  state = {
    products: [],
    cart: [],
  }

  updateProducts = (products) => {
    this.setState({
      products,
    });
    console.log(this.state.products);
  };

  updateCart = (cart) => {
    this.setState({
      cart,
    });
    console.log(this.state.cart);
  };

  render() {
    return (
      <Router>
        <AppLayout className="App">
          <Switch>
            <Route exact path="/" render={() => (<Quotation updateProducts={this.updateProducts} updateCart={this.updateCart} products={this.state.products} />)} />
            <Route path="/login" component={Login} />
          </Switch>
        </AppLayout>
      </Router>
    );
  }
}

export default App;

const AppLayout = styled.div`
  height: 100vh;
  width: 100vw;
`;
