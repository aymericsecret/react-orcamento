import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import idGenerator from 'react-id-generator';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import QuoteElemDrag from './components/QuoteElement/QuoteElemDrag';
import Toggle from '../../../../components/Toggle/Toggle';
import VisibleQuoteRequest from '../QuoteRequest/VisibleQuoteRequest';


class QuoteSystem extends Component {
  constructor(props) {
    super(props);
    this.quoteElemsRef = React.createRef();
  }

  state = {
    showPopup: false,
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

  handleClickOutside = () => {
    console.log('onClickOutside() method called');
  }

  moveElem = (dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex);

    const { quotation, updateProductsOrder } = this.props;
    quotation.products.splice(hoverIndex, 0, quotation.products.splice(dragIndex, 1)[0]);
    updateProductsOrder();
  }

  togglePopup = () => {
    this.setState(prevState => ({
      showPopup: !prevState.showPopup,
    }));
  }

  render() {
    const { quotation } = this.props;
    return (
      <QuoteBlock>
        <QuoteElemsContainer ref={this.quoteElemsRef}>
          {this.props.quotation.products.length === 0
            && (
            <NoElementAdd>
              <div>Nenhum item foi adicionado à cotação.</div>
              <div>Por favor adicione</div>
            </NoElementAdd>
            )}
          {quotation.products.map((elem, index) => (
            <QuoteElemDrag
              id={elem.id}
              index={index}
              quoteItem={elem}
              moveCard={this.moveElem}
              key={`key_${elem.id}`}
            />
          ))}
          {quotation.products.length > 0 && (
            <QuoteRequest>
              <Toggle toggle={this.togglePopup}>Pedir o orçamento</Toggle>

              <Toggle toggle={this.props.resetQuotation}>Reiniciar</Toggle>
            </QuoteRequest>
          )}
        </QuoteElemsContainer>
        <VisibleQuoteRequest isOpen={this.state.showPopup} togglePopup={this.togglePopup} />
      </QuoteBlock>
    );
  }
}
// export default QuoteSystem;

export default DragDropContext(HTML5Backend)(QuoteSystem);

QuoteSystem.propTypes = {
  // session: PropTypes.shape().isRequired,
  quotation: PropTypes.shape({
    id: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  initQuotation: PropTypes.func.isRequired,
  updateProductsOrder: PropTypes.func.isRequired,
  updateElemNode: PropTypes.func.isRequired,
  resetQuotation: PropTypes.func.isRequired,
};

const NoElementAdd = styled.div`
  margin-top: 20px;
  div {
    font-family: 'Omnes';
  }
`;
const QuoteBlock = styled.div`
  position: relative;
  
  background: #EDEDED;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  @media only screen and (min-width: 576px) {
    width: 50%;
  }
`;
const QuoteElemsContainer = styled.div`
  padding: 0 20px 20px;

  > div {
    border-bottom: 1px solid #cdcdcd;
    &:last-child {
      border-bottom: none;
    }
  }
`;
const QuoteRequest = styled.div`
  margin-top: 20px;
  button {
    margin-right: 20px;
    @media only screen and (max-width: 375px) {
      margin-bottom: 20px;
      width: 100%;
    }
  }
`;
