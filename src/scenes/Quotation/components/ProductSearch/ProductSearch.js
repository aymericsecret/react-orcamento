import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput, { createFilter } from 'react-search-input';
import iconSearch from '../../../../assets/icons_search_dark.png';

import VisibleProduct from '../ProductSyst/components/ProductList/components/VisibleProduct';

const KEYS_TO_FILTERS = ['title.rendered', 'subject', 'dest.name', 'cat_names'];

// eslint-disable-next-line
export default class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      // searchTermLong: '',
    };
  }

  searchUpdated = (term) => {
    let newState = {};
    console.log(term.length);

    // if (term.length > 3) {
    newState = {
      // searchTermLong: term,
      searchTerm: term,
    };
    // } else {
    // newState = {
    // searchTerm: term,
    // };
    // }
    this.setState(newState);
  }

  render() {
    const filteredProducts = this.props.products.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

    return (
      <ProductsBlock>
        <IconSearchDiv onClick={this.props.toggleSearch}>
          <img
            src={iconSearch}
            className="icons_search openingGridMenu"
            alt=""
          />
        </IconSearchDiv>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {filteredProducts.map(p => (
          <div className="flex50" key={p.id}>
            <VisibleProduct product={p} key={p.id} toggleSide={this.props.toggleSide} />
          </div>
        ))}
      </ProductsBlock>
    );
  }
}


ProductSearch.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleSearch: PropTypes.func.isRequired,
  toggleSide: PropTypes.func.isRequired,
};


const ProductsBlock = styled.div`
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .flex50 {
    width: calc(50% - 10px);
  }
  .search-input {
    width: 100%;
    margin-bottom: 30px;
    input {
      height: 30px;
      min-height: 30px;
      width: calc(100% - 40px);
    }
  }
`;


const IconSearchDiv = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: white;
  img {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
