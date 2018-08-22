import React from 'react';
import styled from 'styled-components';
import VisibleCategoryList from './components/CategoryList/VisibleCategoryList';
import VisibleProductList from './components/ProductList/VisibleProductList';

const ProductSyst = () => (
  <ProductSystem>
    <VisibleCategoryList />
    <VisibleProductList />
  </ProductSystem>
);

export default ProductSyst;

const ProductSystem = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  padding: 20px 0;
  
  width: 100%;
  @media only screen and (min-width: 576px) {
    width: 50%;
  }
`;
