import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuoteElem from './QuoteElem';
import {
  removeProductFromQuotation,
  updateProductQuantity,
  updateProductPrice,
  updateProductNote,
  updateProductSize,
  updateProductMaterial,
  updateProductSizeX,
  updateProductSizeY,
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
  updateMaterial: updateProductMaterial,
  updateSizeX: updateProductSizeX,
  updateSizeY: updateProductSizeY,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuoteElem);
