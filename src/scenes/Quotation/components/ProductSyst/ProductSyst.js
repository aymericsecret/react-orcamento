import React from 'react';
import styled from 'styled-components';
import VisibleCategoryList from './components/CategoryList/VisibleCategoryList';
import VisibleProductList from './components/ProductList/VisibleProductList';

const ProductSyst = () => (
  <ProductSysteme>
    <VisibleCategoryList />
    <VisibleProductList />
  </ProductSysteme>
);

export default ProductSyst;

const ProductSysteme = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  overflow: scroll;
  padding: 40px 30px;
`;
