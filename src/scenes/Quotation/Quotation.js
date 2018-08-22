import React, { Component } from 'react';
import styled from 'styled-components';
import VisibleQuoteSystem from './components/QuoteSystem/VisibleQuoteSystem';
import ProductSyst from './components/ProductSyst/ProductSyst';
import Toggle from './components/Toggle/Toggle';

class Quotation extends Component {
  state = {
    showProducts: true,
  }

  toggle = () => {
    // console.log('click');
    this.setState(prevState => ({
      showProducts: !prevState.showProducts,
    }));
  }

  render() {
    return (
      <div>
        <Toggle toggle={this.toggle} />
        <QuotationGrid className={this.state.showProducts ? 'product-list' : ''}>
          <VisibleQuoteSystem />
          <ProductSyst />
        </QuotationGrid>
      </div>
    );
  }
}

export default Quotation;

const QuotationGrid = styled.div`
  position: relative;
  display: flex;
  width: 200%;
  height: 100%;
  overflow: hidden;
  transition: transform .3s ease-out;
  &.product-list {
    transform: translateX(-50%);
  }
  @media only screen and (min-width: 576px) {
    width: 100%;
    &.product-list {
      transform: none;
    }
  }
`;
