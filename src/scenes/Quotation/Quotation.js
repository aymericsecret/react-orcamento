import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VisibleQuoteSystem from './components/QuoteSystem/VisibleQuoteSystem';
import ProductSyst from './components/ProductSyst/ProductSyst';
import LoadingScreen from '../../components/LoadingScreen';
import Menu from '../../components/Menu';


class Quotation extends Component {
  constructor(props) {
    super(props);
    this.quoteSystemsRef = React.createRef();
    this.shouldScroll = false;
  }

  state = {
    showProducts: true,
  }

  componentDidMount = () => {
    const { initApp, app } = this.props;
    const oneHour = 60 * 60 * 1000;
    // console.log(new Date() - new Date(app.appLoadedAt));
    if (!app.appLoaded
      || app.categories === {}
      || app.products.length === 0
      || new Date() - new Date(app.appLoadedAt) > oneHour) {
      console.log('ON INIT');

      initApp();
    }
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
    const { app, session, initApp } = this.props;

    return (
      <StyledQuotation>
        {app.appCategoriesLoaded ? (
          <QuotationWrapper>
            <Menu session={session} initApp={initApp} toggleSide={this.toggle}>Orçamento</Menu>

            <QuotationGrid className={this.state.showProducts ? 'product-list' : ''}>

              <VisibleQuoteSystem updateElemNode={this.updateElemNode} ref={this.quoteSystemsRef} />
              <ProductSyst toggleSide={this.toggle} />
            </QuotationGrid>
          </QuotationWrapper>
        ) : (
          <LoadingScreen />
        )}
      </StyledQuotation>
    );
  }
}

export default Quotation;

Quotation.propTypes = {
  session: PropTypes.shape().isRequired,
  app: PropTypes.shape({
    appLoadedAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.any,
    ]),
    appLoaded: PropTypes.bool,
    products: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  initApp: PropTypes.func.isRequired,
};

const StyledQuotation = styled.div`
  height: 100%;
`;
const QuotationWrapper = styled.div`
  height: 100%;
`;
const QuotationGrid = styled.div`
  position: relative;
  display: flex;
  width: 200%;
  height: 100%;
  overflow-x: hidden;
  transition: transform .3s ease-out;
  padding-top: 65px;
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
