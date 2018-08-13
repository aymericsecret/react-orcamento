import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductsList from './components/ProductList/ProductList';
import QuoteSystem from './components/QuoteSystem/QuoteSystem';

class Quotation extends Component {
  state = {
    test: [],
  }

  render() {
    console.log(this.state.test);

    return (
      <React.Fragment>
        <QuoteSystem update={this.props.updateCart} />
        <ProductsList update={this.props.updateProducts} products={this.props.products} />
      </React.Fragment>
    );
  }
}

export default Quotation;

Quotation.propTypes = {
  updateCart: PropTypes.func.isRequired,
  updateProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
