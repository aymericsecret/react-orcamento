import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VisibleProduct from './components/VisibleProduct';

const ProductList = (props) => {
  const {
    products, showSubCategory, subCategory, toggleSide,
  } = props;
  console.log(subCategory);

  if (products.length === 0 && showSubCategory) return (<h1>Product not loaded</h1>);

  console.log(`products : ${products}`);
  const productToShow = products.filter(
    product => product.categories.find(
      category => category === subCategory) !== undefined);
  console.log(`productToShow : ${productToShow}`);

  return (
    <ProductsBlock>
      {showSubCategory
          && productToShow.map(product => (
            <VisibleProduct product={product} key={product.id} toggleSide={toggleSide} />
          ))
        }
    </ProductsBlock>
  );
};

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  subCategory: PropTypes.number.isRequired,
  showSubCategory: PropTypes.bool.isRequired,
  toggleSide: PropTypes.func.isRequired,
};

const ProductsBlock = styled.div`
  columns: 1;
  padding: 0 20px;
  @media only screen and (min-width: 768px) {
    columns: 2;
  }
  -webkit-column-gap: 50px; /* Chrome, Safari, Opera */
  -moz-column-gap: 50px; /* Firefox */
  column-gap: 50px;
`;
