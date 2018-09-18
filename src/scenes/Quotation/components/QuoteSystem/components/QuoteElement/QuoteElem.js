import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ratio from 'react-ratio';
import iconClose from '../../../../../../assets/SVG/light/Icones-02.svg';
import Input from '../../../../../../components/Input';

class QuoteElem extends Component {
  constructor(props) {
    super(props);
    this.quantityHasBeenChanged = false;
    this.priceHasBeenChanged = false;
    this.noteHasBeenChanged = false;
    this.sizeHasBeenChanged = false;
    this.sizeXHasBeenChanged = false;
    this.sizeYHasBeenChanged = false;
    this.materialHasBeenChanged = false;
    this.isPricePerMeterSquare = false;

    this.materialList = [];
    this.sizeList = [];
    this.userPermission = props.userPermission;
  }

  state = {
    product: {},
    quantity: 0,
    price: 0,
    total_price: 0,
    note: '',
    material: '',
    size: '',
    size_x: 1,
    size_y: 1,
  }

  componentWillMount() {
    const product = this.props.products.find(el => el.id === this.props.quoteItem.id_product);
    this.product = product;
    // console.log(this.product);
    // TODO: Remove this verification later, as the back office should have that property always.
    // Or make it better
    // TODO: Case no variation

    // INITIAL QUANTITY
    const quantidadeInitialValue = this.props.quoteItem.quantity === null ? 1 : this.props.quoteItem.quantity;

    // Price per meter square
    this.isPricePerMeterSquare = product.acf.msquare !== undefined ? product.acf.msquare : false;

    // INITIAL SIZES
    let sizeInitialValue = null;
    let sizeXInitialValue = null;
    let sizeYInitialValue = null;
    if (!this.isPricePerMeterSquare) {
      sizeInitialValue = product.acf.variations !== undefined
      && product.acf.variations.length > 0
        ? product.acf.variations[0].size.toLowerCase() : null;
    } else {
      sizeXInitialValue = 1;
      sizeYInitialValue = 1;
    }

    // INITIAL MATERIALS-
    const materialInitialValue = product.acf.variations !== undefined
    && product.acf.variations.length > 0
      ? product.acf.variations[0].material.toLowerCase() : null;

    // Filling materials and sizes variations
    if (product.acf.variations !== undefined && product.acf.variations.length > 0) {
      product.acf.variations.forEach((element) => {
        if (this.materialList.indexOf(element.material.toLowerCase()) < 0) {
          this.materialList.push(element.material.toLowerCase());
        }
        if (this.sizeList.indexOf(element.size.toLowerCase()) < 0) {
          this.sizeList.push(element.size.toLowerCase());
        }
      });
    }

    // INITIAL PRICE
    let priceInitialValue = product.acf.variations !== undefined
    && product.acf.variations.length > 0
      ? product.acf.variations[0].price : 0;
    priceInitialValue = this.props.quoteItem.price === null ? priceInitialValue : this.props.quoteItem.price;

    // INITIAL TOTAL PRICE
    const totalPriceInitialValue = quantidadeInitialValue * priceInitialValue;

    this.setState({
      product,
      quantity: quantidadeInitialValue,
      price: priceInitialValue,
      total_price: this.props.quoteItem.total_price === null
        ? totalPriceInitialValue
        : this.props.quoteItem.total_price,
      note: this.props.quoteItem.note,
      size: this.props.quoteItem.size === null ? sizeInitialValue : this.props.quoteItem.size,
      material: this.props.quoteItem.material === null ? materialInitialValue : this.props.quoteItem.material,
      size_x: this.props.quoteItem.size_x === null ? sizeXInitialValue : this.props.quoteItem.size_x,
      size_y: this.props.quoteItem.size_y === null ? sizeYInitialValue : this.props.quoteItem.size_y,
    });
  }

  getPriceFromCombination = (price = null) => {
    let newPrice = {};
    if (price === null || price === undefined) {
      newPrice = this.product.acf.variations.find((el) => {
        if (this.isPricePerMeterSquare) {
          return el.material.toLowerCase() === this.state.material.toLowerCase();
        }
        return el.size.toLowerCase() === this.state.size.toLowerCase()
        && el.material.toLowerCase() === this.state.material.toLowerCase();
      });
    } else {
      newPrice = {
        price,
      };
    }

    if (newPrice === undefined) {
      newPrice = this.state.price;
    }
    newPrice = this.isPricePerMeterSquare ? newPrice.price * this.state.size_x * this.state.size_y : newPrice.price;
    const newTotalPrice = newPrice * this.state.quantity;

    if (newPrice !== undefined) {
      this.setState({
        price: newPrice,
        total_price: newTotalPrice,
      });
      this.debounce('priceHasBeenChanged', () => {
        if (this.state.price !== this.props.quoteItem.price) {
          this.props.updatePrice({
            id: this.props.quoteItem.id,
            price: parseInt(this.state.price, 10),
          });
        }
        if (this.state.total_price !== this.props.quoteItem.total_price) {
          this.props.updateTotalPrice({
            id: this.props.quoteItem.id,
            total_price: parseInt(this.state.total_price, 10),
          });
        }
      });
    }
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

  updateInput = (e) => {
    const { quantity } = this.state;
    switch (e.type) {
      case 'blur': {
        let value = e.target.value === '' ? 1 : e.target.value;
        value = parseInt(value, 10) === 0 ? 1 : value;
        switch (e.target.dataset.type) {
          case 'price': {
            this.setState({
              price: parseInt(value, 10),
              total_price: quantity * parseInt(value, 10),
            });
            // TODO: Refactor inside setState's callback function
            this.debounce('priceHasBeenChanged', () => {
              if (this.state.price !== this.props.quoteItem.price) {
                this.props.updatePrice({
                  id: this.props.quoteItem.id,
                  price: parseInt(this.state.price, 10),
                });
              }
              if (this.state.total_price !== this.props.quoteItem.total_price) {
                this.props.updateTotalPrice({
                  id: this.props.quoteItem.id,
                  total_price: parseInt(this.state.total_price, 10),
                });
              }
            });
            break;
          }
          case 'total_price': {
            this.setState({
              total_price: parseInt(value, 10),
            });
            // TODO: Refactor inside setState's callback function
            this.debounce('totalPriceHasBeenChanged', () => {
              if (this.state.total_price !== this.props.quoteItem.total_price) {
                this.props.updateTotalPrice({
                  id: this.props.quoteItem.id,
                  total_price: parseInt(this.state.total_price, 10),
                });
              }
            });
            break;
          }
          case 'quantity': {
            this.setState({
              quantity: parseInt(value, 10),
            });
            // TODO: Try refactoring with setState Callback
            this.debounce('quantityHasBeenChanged', () => {
              if (this.state.quantity !== this.props.quoteItem.quantity) {
                const price = this.props.quoteItem.price !== null ? this.props.quoteItem.price : 0;
                this.getPriceFromCombination(price);
                this.props.updateQuantity({
                  id: this.props.quoteItem.id,
                  quantity: parseInt(this.state.quantity, 10),
                });
              }
            });
            break;
          }
          case 'size_x': {
            this.setState({
              size_x: parseInt(value, 10),
            });
            this.debounce('sizeXHasBeenChanged', () => {
              if (this.state.size_x !== this.props.quoteItem.size_x) {
                this.getPriceFromCombination();
                this.props.updateSizeX({
                  id: this.props.quoteItem.id,
                  size_x: parseInt(this.state.size_x, 10),
                });
              }
            });
            break;
          }
          case 'size_y': {
            this.setState({
              size_y: parseInt(value, 10),
            });
            this.debounce('sizeXHasBeenChanged', () => {
              if (this.state.size_y !== this.props.quoteItem.size_y) {
                this.getPriceFromCombination();
                this.props.updateSizeY({
                  id: this.props.quoteItem.id,
                  size_y: parseInt(this.state.size_y, 10),
                });
              }
            });
            break;
          }
          default:
            break;
        }

        break;
      }
      case 'change': {
        const newValue = e.target.value === '' ? e.target.value : parseInt(e.target.value, 10);
        switch (e.target.dataset.type) {
          case 'price': {
            this.setState({
              price: newValue,
              total_price: quantity * newValue,
            });
            break;
          }
          case 'total_price': {
            this.setState({
              total_price: newValue,
            });
            break;
          }
          case 'quantity': {
            this.setState({
              quantity: newValue,
            });
            break;
          }
          case 'size_x': {
            this.setState({
              size_x: newValue,
            });
            break;
          }
          case 'size_y': {
            this.setState({
              size_y: newValue,
            });
            break;
          }
          default:
            break;
        }
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

  updateSelect = (e) => {
    switch (e.target.dataset.type) {
      case 'size': {
        this.setState({
          size: e.target.value,
        });
        this.debounce('sizeHasBeenChanged', () => {
          if (this.state.size !== this.props.quoteItem.size) {
            this.getPriceFromCombination();
            this.props.updateSize({
              id: this.props.quoteItem.id,
              size: this.state.size,
            });
          }
        });
        break;
      }
      case 'material': {
        this.setState({
          material: e.target.value,
        });
        this.debounce('materialHasBeenChanged', () => {
          if (this.state.material !== this.props.quoteItem.material) {
            this.getPriceFromCombination();
            this.props.updateMaterial({
              id: this.props.quoteItem.id,
              material: this.state.material,
            });
          }
        });
        break;
      }
      default:
        break;
    }
  }

  render() {
    const {
      index, quoteItem, removeItem, children,
    } = this.props;

    const coverImg = (this.state.product.acf.packshot === undefined || this.state.product.acf.packshot === false)
      ? this.state.product.acf.header.cover.sizes.thumbnail
      : this.state.product.acf.packshot.sizes.thumbnail;
    const coverAlt = (this.state.product.acf.packshot === undefined || this.state.product.acf.packshot === false)
      ? this.state.product.acf.header.cover.alt
      : this.state.product.acf.packshot.alt;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return (
      <QuoteBox>
        <QuoteBoxHeader>
          {/* eslint-disable-next-line react/no-danger */}
          <h3>{index + 1}. <span dangerouslySetInnerHTML={{ __html: this.state.product.title.rendered }} /></h3>
          { !isMobile && children }
          <button type="button" onClick={() => removeItem(quoteItem.id)}><img src={iconClose} alt="" className="img_icon" /></button>
        </QuoteBoxHeader>
        <QuoteBoxContent>
          <RatioCustom ratio={16 / 9}>
            <img
              src={coverImg}
              alt={coverAlt}
            />
          </RatioCustom>
          <QuoteBoxContentForm>
            <div>
              <Input type="input" domain="product" id={quoteItem.id} label="Quantidade" idType="quantity" value={this.state.quantity} updateValue={this.updateInput} />

              {this.state.size !== null && (
                <Input type="select" domain="product" id={quoteItem.id} label="Tamanhos" idType="size" value={this.state.size} updateValue={this.updateSelect} selectList={this.sizeList} />
              )}
              {this.state.size_x !== null && (
                <Input type="input" domain="product" id={quoteItem.id} label="Largura" idType="size_x" value={this.state.size_x} updateValue={this.updateInput} />
              )}
              {this.state.size_y !== null && (
                <Input type="input" domain="product" id={quoteItem.id} label="Profondidade" idType="size_y" value={this.state.size_y} updateValue={this.updateInput} />
              )}

              {this.state.material !== null && (
                <Input type="select" domain="product" id={quoteItem.id} label="Acabamento" idType="material" value={this.state.material} updateValue={this.updateSelect} selectList={this.materialList} />
              )}
            </div>

            <div>
              {this.userPermission === 1 && this.state.price !== null && (
                <div>
                  <Input type="input" domain="product" id={quoteItem.id} label="Preço unitario" idType="price" value={this.state.price} updateValue={this.updateInput} />
                  <Input type="input" domain="product" id={quoteItem.id} label="Preço total" idType="total_price" value={this.state.total_price} updateValue={this.updateInput} />
                  {/* <div>
                    <div className="total_price">Preço total</div>
                    <div>{this.state.total_price}</div>
                  </div> */}
                </div>
              )}
              <Input type="textarea" domain="product" id={quoteItem.id} label="Notas" idType="note" value={this.state.note} updateValue={this.updateNote} />
            </div>
          </QuoteBoxContentForm>
        </QuoteBoxContent>
      </QuoteBox>
    );
  }
}

export default QuoteElem;

QuoteElem.propTypes = {
  userPermission: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.shape().isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  quoteItem: PropTypes.shape({
    id: PropTypes.number,
    id_product: PropTypes.number,
    quantity: PropTypes.number,
    total_price: PropTypes.number,
    price: PropTypes.number,
    note: PropTypes.string,
    size: PropTypes.string,
    material: PropTypes.string,
    size_x: PropTypes.number,
    size_y: PropTypes.number,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  updatePrice: PropTypes.func.isRequired,
  updateTotalPrice: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  updateSize: PropTypes.func.isRequired,
  updateMaterial: PropTypes.func.isRequired,
  updateSizeX: PropTypes.func.isRequired,
  updateSizeY: PropTypes.func.isRequired,
};

const QuoteBox = styled.div`
  padding: 20px 0 0 0;
  margin-bottom: 20px;
`;

const QuoteBoxHeader = styled.div`
  display: flex;
  align-items: flex-start;
  h3 {
    width: calc(100% - 25px);
    margin: 0 0 20px 0;

    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0px;
    font-family: 'OmnesMedium';
  }
  button {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;

const QuoteBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const RatioCustom = styled(Ratio)`
  width: 100%;
  padding-right: 0;
  padding-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media only screen and (min-width: 1024px) {
    width: 50%;
    padding-right: 10px;
    padding-bottom: 0;
  }
`;

const QuoteBoxContentForm = styled.div`
  display: flex;
  width: 100%;
  padding-left: 0;
  > div {
    width: 50%;
    &:first-child {
      padding-right: 5px;
    }
    &:last-child {
      padding-left: 5px;
    }
    label {
      display: block;
      margin-bottom: 10px;

      font-family: 'Omnes';
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.8px;
      span {
        display: block;
      }
      input, select {
        max-width: 140px;
        width: 100%;
        margin-bottom: 6px;
      }
      textarea {
        max-width: 100%;
        min-width: 100%;
        width: 100%;
        height: 50px;
      }
    }
    .total_price {
      margin-bottom: 5px;
    }
  }
  @media only screen and (min-width: 1024px) {
    width: 50%;
    padding-left: 10px;  
  }
`;
