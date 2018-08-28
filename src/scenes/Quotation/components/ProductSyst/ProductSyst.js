import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VisibleCategoryList from './components/CategoryList/VisibleCategoryList';
import VisibleProductList from './components/ProductList/VisibleProductList';

const ProductSyst = props => (
  <ProductSystem>
    <VisibleCategoryList />
    <VisibleProductList toggleSide={props.toggleSide} />
  </ProductSystem>
);

export default ProductSyst;

ProductSyst.propTypes = {
  toggleSide: PropTypes.func.isRequired,
};

const ProductSystem = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px 0;
  height: 100%;
  width: 100%;
  @media only screen and (min-width: 576px) {
    width: 50%;
  }
`;
