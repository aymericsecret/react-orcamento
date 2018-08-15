import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class QuoteElem extends Component {
  state = {
    product: {},
  }

  componentWillMount() {
    this.setState({
      product: this.props.products.find(el => el.id === this.props.quoteItem.id_product),
    });
  }
  // updateQuantity = (e) => {
  //   const quantity = parseInt(e.target.value, 10);
  //   this.setState({
  //     // quantity,
  //   });
  //   this.tmpCartItem.quantity = quantity;
  //   this.props.updateCart(this.tmpCartItem);
  // }

  render() {
    const { index, quoteItem, removeItem } = this.props;
    return (
      <QuoteBox>
        <h3>{index + 1}. {this.state.product.title.rendered}</h3>
        <img
          src={this.state.product.acf.header.cover.sizes.thumbnail}
          alt={this.state.product.acf.header.cover.alt}
        />
        <button type="button" onClick={() => removeItem(quoteItem.id_product)}>Supprimer</button>
        {/* <input type="text" value={this.state.quantity} onChange={this.updateQuantity} /> */}
      </QuoteBox>
    );
  }
}

export default QuoteElem;

QuoteElem.propTypes = {
  index: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  quoteItem: PropTypes.shape({
    id_product: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
  // updateCart: PropTypes.func.isRequired,
};

const QuoteBox = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;
