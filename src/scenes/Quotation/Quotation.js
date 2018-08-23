import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import VisibleQuoteSystem from './components/QuoteSystem/VisibleQuoteSystem';
import ProductSyst from './components/ProductSyst/ProductSyst';
import Toggle from './components/Toggle/Toggle';

class Quotation extends Component {
  constructor(props) {
    super(props);
    this.quoteSystemsRef = React.createRef();
    this.shouldScroll = false;
  }

  state = {
    showProducts: true,
  }

  updateElemNode = (node) => {
    if (this.shouldScroll) {
      this.shouldScroll = false;
      // eslint-disable-next-line react/no-find-dom-node
      const container = ReactDOM.findDOMNode(this.quoteSystemsRef.current);
      container.scrollTo(0, node.scrollHeight);
    }
  }

  toggle = (args) => {
    this.setState(prevState => ({
      showProducts: !prevState.showProducts,
    }));
    if (args && args.type !== undefined) {
      // Allow scroll to bottom when QuoteSystem height has been changed (updateElemNode)
      this.shouldScroll = true;
    }
  }

  render() {
    return (
      <div>
        <Toggle toggle={this.toggle} />
        <QuotationGrid className={this.state.showProducts ? 'product-list' : ''}>
          <VisibleQuoteSystem updateElemNode={this.updateElemNode} ref={this.quoteSystemsRef} />
          <ProductSyst toggleSide={this.toggle} />
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
