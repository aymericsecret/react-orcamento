import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VisibleProduct from './components/VisibleProduct';

class ProductList extends Component {
  componentDidMount = () => {
    const {
      getProducts, isLoaded, productsLoadedAt, subCategory,
    } = this.props;
    console.log(`getProduct :${getProducts} ${this.props.getProducts}`);

    const oneHour = 60 * 60 * 1000;
    console.log(new Date() - new Date(productsLoadedAt));

    if ((!isLoaded || ((new Date() - new Date(productsLoadedAt)) > oneHour))) {
      getProducts(subCategory);
    }
  }

  render() {
    const {
      products, isLoaded, showSubCategory, subCategory,
    } = this.props;
    if (!isLoaded) return <h1>Product not loaded</h1>;
    console.log(`products : ${products}`);
    const productToShow = products.filter(
      product => product.categories.find(
        category => category === subCategory) !== undefined);
    console.log(`productToShow : ${productToShow}`);
    return (
      <ProductsBlock>
        {!showSubCategory
          && productToShow.map(product => (<VisibleProduct product={product} key={product.id} />))}
      </ProductsBlock>
    );
  }
}

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  isLoaded: PropTypes.bool.isRequired,
  getProducts: PropTypes.func.isRequired,
  productsLoadedAt: PropTypes.string.isRequired,
  subCategory: PropTypes.number.isRequired,
  showSubCategory: PropTypes.bool.isRequired,
};

ProductList.defaultProps = {
  products: [],
};

const ProductsBlock = styled.div`
  columns: 1;
  @media only screen and (min-width: 768px) {
    columns: 2;
  }
  -webkit-column-gap: 50px; /* Chrome, Safari, Opera */
  -moz-column-gap: 50px; /* Firefox */
  column-gap: 50px;
`;
