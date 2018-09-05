import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VisibleProduct from '../ProductSyst/components/ProductList/components/VisibleProduct';

export default class ProductSearch extends Component {
  toggleSearchResults = () => {
    this.props.searchToggle();
  }

  render() {
    const { search } = this.props;
    return (
      <SearchResults>
        <SearchResultsHeader>
          <h2>Pesquisa</h2>
          <button type="button" onClick={this.toggleSearchResults}>Voltar</button>
        </SearchResultsHeader>

        {search.searchResult.length > 0 && search.searchResult.map(p => (
          <div className="flex50" key={p.id}>
            <VisibleProduct product={p} key={p.id} toggleSide={this.props.toggleSide} />
          </div>
        ))}
        {search.searchResult.length === 0 && search.searchTerm.length > 2 && (
          <h3>
            No result found for that search.
          </h3>
        )}
        {search.searchResult.length === 0 && search.searchTerm.length <= 2 && (
          <h3>
            Enter at least 3 letters to get a result.
          </h3>
        )}

      </SearchResults>
    );
  }
}


ProductSearch.propTypes = {
  searchToggle: PropTypes.func.isRequired,
  toggleSide: PropTypes.func.isRequired,
  search: PropTypes.shape({
    searchTerm: PropTypes.string,
    searchInit: PropTypes.bool,
    searchToggle: PropTypes.bool,
    searchResult: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};


const SearchResults = styled.div`
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .flex50 {
    width: calc(50% - 10px);
  }
`;
const SearchResultsHeader = styled.div`
  width: 100%;
  display: flex;
  h2 {
    width: 100%;
    margin: 0 0 40px 0;
  }

`;
