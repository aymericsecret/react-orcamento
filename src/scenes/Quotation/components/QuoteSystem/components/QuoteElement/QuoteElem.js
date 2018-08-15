import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ratio from 'react-ratio';
import idGenerator from 'react-id-generator';
import iconClose from '../../../../../../assets/close.svg';

class QuoteElem extends Component {
  constructor() {
    super();
    this.quantityHasBeenChanged = false;
    this.priceHasBeenChanged = false;
    this.noteHasBeenChanged = false;
    this.sizeHasBeenChanged = false;
    this.userPermission = 1;
  }

  state = {
    product: {},
    quantity: 0,
    price: 0,
    note: '',
    size: '',
  }

  componentWillMount() {
    const product = this.props.products.find(el => el.id === this.props.quoteItem.id_product);
    // TODO: Remove this verification later, as the back office should have that property always.
    // Or make it better
    const sizeInitialValue = product.acf.variations !== undefined
    && product.acf.variations.length > 0
      ? product.acf.variations[0].size : null;
    const priceInitialValue = product.acf.variations !== undefined
    && product.acf.variations.length > 0
      ? product.acf.variations[0].price : null;

    this.setState({
      product,
      quantity: this.props.quoteItem.quantity,
      price: this.props.quoteItem.price === null ? priceInitialValue : this.props.quoteItem.price,
      note: this.props.quoteItem.note,
      size: this.props.quoteItem.size === null ? sizeInitialValue : this.props.quoteItem.size,
    });
  }

  debounce = (debounceTmp, callback) => {
    // Avoiding losing input's focus while typing, and sending a prop update for each character
    this[debounceTmp] = true;
    setTimeout(() => {
      this[debounceTmp] = false;
      setTimeout(() => {
        if (!this[debounceTmp]) {
          callback();
        }
      }, 100);
    }, 50);
  }

  updateQuantity = (e) => {
    switch (e.type) {
      case 'blur': {
        const value = e.target.value === '' ? 0 : e.target.value;
        this.setState({
          quantity: parseInt(value, 10),
        });
        this.debounce('quantityHasBeenChanged', () => {
          if (this.state.quantity !== this.props.quoteItem.quantity) {
            this.props.updateQuantity({
              id: this.props.quoteItem.id,
              quantity: parseInt(this.state.quantity, 10),
            });
          }
        });
        break;
      }
      case 'change': {
        this.setState({
          quantity: e.target.value,
        });
        break;
      }
      default:
        break;
    }
  }

  updatePrice = (e) => {
    switch (e.type) {
      case 'blur': {
        const value = e.target.value === '' ? 0 : e.target.value;
        this.setState({
          price: parseInt(value, 10),
        });
        this.debounce('priceHasBeenChanged', () => {
          if (this.state.price !== this.props.quoteItem.price) {
            this.props.updatePrice({
              id: this.props.quoteItem.id,
              price: parseInt(this.state.price, 10),
            });
          }
        });
        break;
      }
      case 'change': {
        this.setState({
          price: e.target.value,
        });
        break;
      }
      default:
        break;
    }
  }

  updateNote = (e) => {
    switch (e.type) {
      case 'blur': {
        this.debounce('noteHasBeenChanged', () => {
          if (this.state.note !== this.props.quoteItem.note) {
            this.props.updateNote({
              id: this.props.quoteItem.id,
              note: this.state.note,
            });
          }
        });
        break;
      }
      case 'change': {
        this.setState({
          note: e.target.value,
        });
        break;
      }
      default:
        break;
    }
  }

  updateSize = (e) => {
    this.setState({
      size: e.target.value,
    });
    this.debounce('sizeHasBeenChanged', () => {
      if (this.state.size !== this.props.quoteItem.size) {
        this.props.updateSize({
          id: this.props.quoteItem.id,
          size: this.state.size,
        });
      }
    });
  }

  render() {
    const { index, quoteItem, removeItem } = this.props;
    return (
      <QuoteBox>
        <QuoteBoxHeader>
          <h3>{index + 1}. {this.state.product.title.rendered}</h3>
          <button type="button" onClick={() => removeItem(quoteItem.id)}><img src={iconClose} alt="" /></button>
        </QuoteBoxHeader>
        <QuoteBoxContent>
          <RatioCustom ratio={16 / 9}>
            <img
              src={this.state.product.acf.header.cover.sizes.thumbnail}
              alt={this.state.product.acf.header.cover.alt}
            />
          </RatioCustom>
          <QuoteBoxContentForm>
            <div>
              <label htmlFor={`product_${quoteItem.id}_quantity`}>
                <span>Quantidade</span>
                <input type="number" id={`product_${quoteItem.id}_quantity`} key={`product_${quoteItem.id}_quantity`} value={this.state.quantity} onChange={this.updateQuantity} onBlur={this.updateQuantity} />
              </label>

              {this.state.size !== null && (
                // eslint-disable-next-line jsx-a11y/label-has-for
                <label htmlFor={`product_${quoteItem.id}_size`}>
                  <span>Tamanhos</span>
                  <select id={`product_${quoteItem.id}_size`} key={`product_${quoteItem.id}_size`} onChange={this.updateSize} value={this.state.size.toLowerCase()}>
                    {this.state.product.acf.variations.map(elem => (
                      <option value={elem.size.toLowerCase()} key={`product_${quoteItem.id}_size_${idGenerator()}`}>{elem.size}</option>
                    ))}
                  </select>
                </label>
              )}

              {this.userPermission === 1 && this.state.price !== null && (
                <label htmlFor={`product_${quoteItem.id}_price`}>
                  <span>Preço</span>
                  <input type="number" id={`product_${quoteItem.id}_price`} key={`product_${quoteItem.id}_price`} value={this.state.price} onChange={this.updatePrice} onBlur={this.updatePrice} />
                </label>
              )}
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label htmlFor={`product_${quoteItem.id}_note`}>
                <span>Notas</span>
                <textarea id={`product_${quoteItem.id}_note`} key={`product_${quoteItem.id}_note`} value={this.state.note} onChange={this.updateNote} onBlur={this.updateNote} />
              </label>
            </div>
          </QuoteBoxContentForm>
        </QuoteBoxContent>
      </QuoteBox>
    );
  }
}

export default QuoteElem;

QuoteElem.propTypes = {
  index: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  quoteItem: PropTypes.shape({
    id: PropTypes.string,
    id_product: PropTypes.number,
    quantity: PropTypes.number,
    price: PropTypes.number,
    note: PropTypes.string,
    size: PropTypes.string,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  updatePrice: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  updateSize: PropTypes.func.isRequired,
};

const QuoteBox = styled.div`
  padding: 20px 0;
  margin-bottom: 20px;
`;

const QuoteBoxHeader = styled.div`
  display: flex;
  align-items: flex-start;
  h3 {
    width: calc(100% - 25px);
    margin: 0 0 20px 0;
  }
  button {
    width: 25px;
    height: 25px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;

const RatioCustom = styled(Ratio)`
  width: 50%;
  padding-right: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const QuoteBoxContent = styled.div`
  display: flex;
`;

const QuoteBoxContentForm = styled.div`
  display: flex;
  width: 50%;
  padding-left: 10px;
  > div {
    width: 50%;
    &:first-child {
      padding-right: 5px;
    }
    &:last-child {
      padding-left: 5px;
    }
    > label {
      display: block;
      margin-bottom: 10px;
      span {
        display: block;
        margin-bottom: 5px;
      }
      input {
        max-width: 100px;
      }
      textarea {
        max-width: 100%;
        min-width: 100%;
        width: 100%;
        height: 50px;
      }
    }
  }
`;
