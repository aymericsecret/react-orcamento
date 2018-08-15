import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuoteElem from './QuoteElem';
import { removeProductFromQuotation } from '../../actions';

const mapStateToProps = state => ({
  products: state.products.products,
  isLoaded: state.products.productsLoaded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // getProduct,
  removeItem: removeProductFromQuotation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuoteElem);
