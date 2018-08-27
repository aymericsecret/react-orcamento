import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import idGenerator from 'react-id-generator';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Header from '../../../../components/Header';
import QuoteElemDrag from './components/QuoteElement/QuoteElemDrag';
// import VisibleQuoteElem from './components/QuoteElement/VisibleQuoteElem';

class QuoteSystem extends Component {
  constructor(props) {
    super(props);
    this.quoteElemsRef = React.createRef();
  }

  componentWillMount() {
    const { quotation, initQuotation } = this.props;
    if (quotation.id === null) {
      quotation.id = idGenerator();
      initQuotation(quotation);
    }
  }

  componentDidUpdate() {
    // We get the new height of the container after an element has been added
    setTimeout(() => {
      // eslint-disable-next-line react/no-find-dom-node
      const node = ReactDOM.findDOMNode(this.quoteElemsRef.current);
      this.props.updateElemNode(node);
    });
  }

  moveElem = (dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex);

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
        <QuoteElemsContainer ref={this.quoteElemsRef}>
          {quotation.products.map((elem, index) => (
            <QuoteElemDrag
              id={elem.id}
              index={index}
              quoteItem={elem}
              moveCard={this.moveElem}
              key={`key_${elem.id}`}
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
  updateElemNode: PropTypes.func.isRequired,
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
  
  background: #EDEDED;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: 100px;
  height: 100vh;
  width: 100%;
  @media only screen and (min-width: 576px) {
    width: 50%;
  }
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
