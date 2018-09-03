import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VisibleCategoryList from './components/CategoryList/VisibleCategoryList';
import VisibleProductList from './components/ProductList/VisibleProductList';
import VisibleProductSearch from '../ProductSearch/VisibleProductSearch';

class ProductSyst extends Component {
  state = {
    search: false,
  }

  toggleSearch = () => {
    console.log('yo');

    const { search } = this.state;
    this.setState({
      search: !search,
    });
  }

  render() {
    return (
      <ProductSystem>
        {this.state.search ? (
          <VisibleProductSearch toggleSide={this.props.toggleSide} toggleSearch={this.toggleSearch} />
        ) : (
          <Fragment>
            <VisibleCategoryList toggleSearch={this.toggleSearch} />
            <VisibleProductList toggleSide={this.props.toggleSide} />
          </Fragment>
        )}
      </ProductSystem>

    );
  }
}

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
