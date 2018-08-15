import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuoteElem from './QuoteElem';
import {
  removeProductFromQuotation,
  updateProductQuantity,
  updateProductPrice,
  updateProductNote,
  updateProductSize,
} from '../../actions';

const mapStateToProps = state => ({
  products: state.products.products,
  isLoaded: state.products.productsLoaded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // getProduct,
  removeItem: removeProductFromQuotation,
  updateQuantity: updateProductQuantity,
  updatePrice: updateProductPrice,
  updateNote: updateProductNote,
  updateSize: updateProductSize,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuoteElem);
