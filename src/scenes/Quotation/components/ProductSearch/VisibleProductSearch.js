import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  initSearch, updateSearchTerm, updateSearchResult, searchToggle,
} from './actions';
import ProductSearch from './ProductSearch';


const mapStateToProps = state => ({
  products: state.app.products,
  categories: state.app.categories,
  search: state.search,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  initSearch,
  updateSearchTerm,
  updateSearchResult,
  searchToggle,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearch);
