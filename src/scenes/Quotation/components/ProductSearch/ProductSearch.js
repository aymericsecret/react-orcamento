import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput, { createFilter } from 'react-search-input';
import iconSearch from '../../../../assets/SVG/light/Icones-08.svg';

const KEYS_TO_FILTERS = ['title.rendered', 'subject', 'dest.name', 'cat_names'];

export default class ProductSearch extends Component {
  componentDidMount() {
    this.props.initSearch();
  }

  extendSearchBar = (e) => {
    const { target, currentTarget } = e;

    if (target.classList.contains('icons_search')) {
      if (currentTarget.classList.contains('active')) {
        // This won't happen ever
        currentTarget.classList.remove('active');
        this.props.searchToggle(false);
      } else {
        currentTarget.classList.add('active');
        // remove this to toggle when clicking on the search button
        if (this.props.search.searchTerm.length > 2) {
          this.props.searchToggle(true);
        }
      }
    }
  }

  searchUpdated = (term) => {
    this.props.updateSearchTerm(term);
    let filteredProducts = [];
    if (this.props.search.searchTerm.length > 2) {
      filteredProducts = this.props.products.filter(createFilter(this.props.search.searchTerm, KEYS_TO_FILTERS));
      if (this.props.sessionPermission === 0) {
        filteredProducts = filteredProducts.filter(el => el.acf.permission !== true);
      }

      // remove this to toggle when clicking on the search button only
      if (!this.props.search.searchToggle) this.props.searchToggle(true);
    }
    this.props.updateSearchResult(filteredProducts);
  }

  render() {
    return (
      <ProductsBlock onClick={this.extendSearchBar} className={this.props.search.searchToggle ? 'active' : ''}>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <IconSearchDiv>
          <img
            src={iconSearch}
            className="icons_search openingGridMenu img_icon"
            alt=""
          />
        </IconSearchDiv>
        {/* {filteredProducts.length > 0 && filteredProducts.map(p => (
          <div className="flex50" key={p.id}>
            <VisibleProduct product={p} key={p.id} toggleSide={this.props.toggleSide} />
          </div>
        ))}
        {filteredProducts.length === 0 && search.searchTerm.length > 2 && (
          <h3>
            No result found for that search.
          </h3>
        )}
        {filteredProducts.length === 0 && search.searchTerm.length <= 2 && (
          <h3>
            Enter at least 3 letters to get a result.
          </h3>
        )} */}

      </ProductsBlock>
    );
  }
}


ProductSearch.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.shape({
    searchTerm: PropTypes.string,
    searchInit: PropTypes.bool,
    searchToggle: PropTypes.bool,
  }).isRequired,
  initSearch: PropTypes.func.isRequired,
  updateSearchTerm: PropTypes.func.isRequired,
  updateSearchResult: PropTypes.func.isRequired,
  searchToggle: PropTypes.func.isRequired,
  sessionPermission: PropTypes.number.isRequired,
};


const ProductsBlock = styled.div`

  position: relative;
  overflow: hidden;
  width: 30px;
  height: 21px;

  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  transition: width .2s ease-out;
  &.active {
    @media only screen and (min-width: 567px) {
      width: 260px;
    }
    @media only screen and (max-width: 567px) {
      .search-input {
        opacity: 1;
      }
    }
  }
  .search-input {
    position: absolute;
    right: 40px;
    top: 0;
    width: 220px;
    input {
      height: 21px;
      min-height: 21px;
      width: 100%;
      border: none;
      border-bottom: 1px solid #3C3C3C !important;
      font-size: 16px;
      font-family: 'Omnes';
    }
    @media only screen and (max-width: 567px) {
      position: fixed;
      right: 0;
      top: 54px;
      width: 100vw;
      padding: 0 20px 5px 20px;
      background: white;
      transition: opacity .3s ease-out;
      opacity: 0;
    }
  }
`;

const IconSearchDiv = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 0;

`;
