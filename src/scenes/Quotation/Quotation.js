import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProductsList from './components/ProductList/ProductList';
import QuoteSystem from './components/QuoteSystem/QuoteSystem';

class Quotation extends Component {
  state = {
    test: [],
  }

  render() {
    console.log(this.state.test);

    return (
      <QuotationGrid>
        <QuoteSystem update={this.props.updateCart} />
        <ProductsList update={this.props.updateProducts} products={this.props.products} />
      </QuotationGrid>
    );
  }
}

export default Quotation;

Quotation.propTypes = {
  updateCart: PropTypes.func.isRequired,
  updateProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const QuotationGrid = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
