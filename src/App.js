import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import logo from './assets/logo_cremme_grey.svg';
import './App.css';
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
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <Link to="/login">
              <h6>Admin</h6>
            </Link>
          </header>
          <Switch>
            <Route exact path="/" render={() => (<Quotation updateProducts={this.updateProducts} updateCart={this.updateCart} products={this.state.products} />)} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
