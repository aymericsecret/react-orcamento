import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import windowDimensions from 'react-window-dimensions';
import SearchInput, { createFilter } from 'react-search-input';
import config from '../../../../utils/config';

const { search } = config.icons;

const KEYS_TO_FILTERS = ['title.rendered', 'subject', 'dest.name', 'cat_names'];

class ProductSearch extends Component {
  componentDidMount() {
    this.props.initSearch();
  }

  extendSearchBar = (e) => {
    const { target, currentTarget } = e;

    // If the loop has been clicked and not the search input
    if (target.classList.contains('icons_search')) {
      // If SearchBar activated we remove it
      if (currentTarget.classList.contains('active')) {
        currentTarget.classList.remove('active');
        this.props.searchToggle(false);
      } else {
        currentTarget.classList.add('active');
        if (this.props.search.searchTerm.length > 2 || this.props.width < 567) {
          this.props.searchToggle(true);
        }
        // If mobile, we toggle the side to be on products side
        if (this.props.width < 567) {
          this.props.toggleSide({ forceProductSide: true });
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
      <ProductsBlock id="id_logo_search" onClick={this.extendSearchBar} className={this.props.search.searchToggle ? 'active' : ''}>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <IconSearchDiv>
          <img
            src={search}
            className="icons_search openingGridMenu img_icon"
            alt=""
          />
        </IconSearchDiv>
      </ProductsBlock>
    );
  }
}

export default windowDimensions()(ProductSearch);

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
  toggleSide: PropTypes.func.isRequired,
  searchToggle: PropTypes.func.isRequired,
  sessionPermission: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
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
    width: 200px;
    input {
      height: 21px;
      min-height: 21px;
      width: 100%;
      border: none;
      border-bottom: 1px solid ${config.fontColor} !important;
      font-size: 16px;
      font-family: ${config.fonts.regular};
    }
    input::placeholder {
      color: ${config.fontColor} !important;
    }
    input::-webkit-input-placeholder {
      color: ${config.fontColor} !important;
    }
    input::-moz-placeholder {
      color: ${config.fontColor} !important;
    }
    input:-ms-input-placeholder {
      color: ${config.fontColor} !important;
    }
    input:-moz-placeholder {
      color: ${config.fontColor} !important;
    }
    @media only screen and (max-width: 567px) {
      position: fixed;
      right: 0;
      top: 65px;
      width: 100vw;
      padding: 0 20px 5px 20px;
      background: white;
      transition: opacity .2s ease-out;
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
