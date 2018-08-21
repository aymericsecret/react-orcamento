import React from 'react';
import styled from 'styled-components';
// import VisibleProductsList
// from './components/ProductSyst/components/ProductList/VisibleProductList';
import VisibleQuoteSystem from './components/QuoteSystem/VisibleQuoteSystem';
// import CategoryList from './components/ProductSyst/components/CategoryList/CategoryList';
import ProductSyst from './components/ProductSyst/ProductSyst';

const Quotation = () => (
  <QuotationGrid>
    <VisibleQuoteSystem />
    {/* <VisibleProductsList /> */}
    <ProductSyst />
  </QuotationGrid>
);

export default Quotation;

const QuotationGrid = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
