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
  products: state.app.products,
});

const mapDispatchToProps = dispatch => bindActionCreators({
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
