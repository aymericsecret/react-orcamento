import React, { Component } from 'react';
import styled from 'styled-components';
import idGenerator from 'react-id-generator';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Header from '../../../../components/Header';
import QuoteElemDrag from './components/QuoteElement/QuoteElemDrag';
// import VisibleQuoteElem from './components/QuoteElement/VisibleQuoteElem';

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

  moveCard = (dragIndex, hoverIndex) => {
    const { quotation, updateProductsOrder } = this.props;
    quotation.products.splice(hoverIndex, 0, quotation.products.splice(dragIndex, 1)[0]);
    updateProductsOrder();
  }

  render() {
    const { quotation } = this.props;
    return (
      <QuoteBlock>
        <StyledHeader>
          <Header />
        </StyledHeader>
        <QuoteElemsContainer>
          {quotation.products.map((elem, index) => (

            <QuoteElemDrag
              id={elem.id}
              index={index}
              quoteItem={elem}
              idKey={idGenerator()}
              moveCard={this.moveCard}
            />
          ))}
        </QuoteElemsContainer>
      </QuoteBlock>
    );
  }
}
// export default QuoteSystem;

export default DragDropContext(HTML5Backend)(QuoteSystem);

QuoteSystem.propTypes = {
  quotation: PropTypes.shape({
    id: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  initQuotation: PropTypes.func.isRequired,
  updateProductsOrder: PropTypes.func.isRequired,
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
