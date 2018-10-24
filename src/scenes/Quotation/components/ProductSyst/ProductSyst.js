import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import VisibleCategoryList from './components/CategoryList/VisibleCategoryList';
import VisibleProductList from './components/ProductList/VisibleProductList';
import VisibleProductSearchResults from '../ProductSearch/VisibleProductSearchResults';

const ProductSyst = props => (
  <ProductSystem>
    {props.search.searchToggle ? (
      <VisibleProductSearchResults toggleSide={props.toggleSide} />
    ) : (
      <Fragment>
        <VisibleCategoryList />
        <VisibleProductList toggleSide={props.toggleSide} />
      </Fragment>
    )}
  </ProductSystem>
);

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps)(ProductSyst);

ProductSyst.propTypes = {
  toggleSide: PropTypes.func.isRequired,
  search: PropTypes.shape({
    searchToggle: PropTypes.bool,
  }).isRequired,
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
