import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import Category from '../CategoryList/components/Category';
// import LinkCustom from '../../../../../../components/LinkCustom';
import VisibleProduct from './components/VisibleProduct';

class ProductList extends Component {
  componentDidMount = () => {
    const {
      getProducts, isLoaded, productsLoadedAt, subCategory,
    } = this.props;
    console.log(`getProduct :${getProducts} ${this.props.getProducts}`);

    const oneHour = 60 * 60 * 1000;
    console.log(new Date() - new Date(productsLoadedAt));
    // }
    if ((!isLoaded || ((new Date() - new Date(productsLoadedAt)) > oneHour))) {
      getProducts(subCategory);
    }
  }

  render() {
    const { products, isLoaded } = this.props;
    if (!isLoaded) return <h1>Product not loaded</h1>;
    return (
      <ProductsBlock>
        {products.map(product => (<VisibleProduct product={product} key={product.id} />))}
        {/* {products.map(product => (<VisibleProduct product={product} key={product.id} />))} */}
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
  subCategory: PropTypes.func.isRequired,
};

// defaut
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
// const Categories = styled.div`
//   height: 40px;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   text-align: center;
//   display: flex;
//   justify-content: space-around;
// `;
