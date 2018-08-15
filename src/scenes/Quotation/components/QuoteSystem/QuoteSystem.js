import React, { Component } from 'react';
import styled from 'styled-components';
import idGenerator from 'react-id-generator';
import PropTypes from 'prop-types';
import Header from '../../../../components/Header';
import VisibleQuoteElem from './components/QuoteElement/VisibleQuoteElem';

class QuoteSystem extends Component {
  componentWillMount() {
    const { quotation, initQuotation } = this.props;
    if (quotation.id === null) {
      quotation.id = idGenerator();
      initQuotation(quotation);
    }
  }

  updateCart = (idProduct, newEntry) => {
    console.log(idProduct, newEntry);
  };

  render() {
    const { quotation } = this.props;
    console.log(quotation);
    return (
      <QuoteBlock>
        <StyledHeader>
          <Header />
        </StyledHeader>
        <QuoteElemsContainer>
          {quotation.products.map((elem, index) => (
            <VisibleQuoteElem
              index={index}
              quoteItem={elem}
              // updateCart={this.updateCart}
              key={idGenerator()}
            />
          ))}
        </QuoteElemsContainer>
      </QuoteBlock>
    );
  }
}

export default QuoteSystem;

QuoteSystem.propTypes = {
  quotation: PropTypes.shape({
    id: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  initQuotation: PropTypes.func.isRequired,
};

const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  height: 80px;
  width: 50%;
`;
const QuoteBlock = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  background: #EDEDED;
  overflow: scroll;
  padding-top: 100px;
`;
const QuoteElemsContainer = styled.div`
  padding: 0 20px 20px;

  > div {
    border-bottom: 1px solid #3c3c3c;
    &:first-child {
      border-top: 1px solid #3c3c3c;
    }
  }
`;
