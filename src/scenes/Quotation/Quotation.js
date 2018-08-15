import React from 'react';
import styled from 'styled-components';
import VisibleProductsList from './components/ProductList/VisibleProductList';
import VisibleQuoteSystem from './components/QuoteSystem/VisibleQuoteSystem';

const Quotation = () => (
  <QuotationGrid>
    <VisibleQuoteSystem />
    <VisibleProductsList />
  </QuotationGrid>
);

export default Quotation;

const QuotationGrid = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
