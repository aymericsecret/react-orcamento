import React from 'react';
import styled from 'styled-components';
import VisibleQuoteSystem from './components/QuoteSystem/VisibleQuoteSystem';
import ProductSyst from './components/ProductSyst/ProductSyst';

const Quotation = () => (
  <QuotationGrid>
    <VisibleQuoteSystem />
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
